/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { search as searchApi, songPic as songPicApi } from '@/apis'

export const searchByKeywords = createAsyncThunk('search/search', async ({ keywords, offset }) => {
  let result = {},
    songs = []
  try {
    let res = await searchApi({ keywords, offset })
    result = res.result
    songs = result.songs
    if (!songs) {
      // 在限制内通过折半查找最大数量
      songs = await binarySearch({ keywords, offset })
    }
    songs = songs.map((song) => {
      return {
        id: song.id,
        name: song.name,
        artist: song.artists.map((artist) => artist.name).join('/'),
        duration: song.duration
      }
    })
  } catch (e) {
    console.error('接口取消 或 (网络不佳，请使用自建接口或者代理)')
  } finally {
    return { songs, keywords, offset }
  }
})

export const songPicByIds = createAsyncThunk(
  'search/songPic',
  async ({ ids, keywords, offset }) => {
    let pics = []
    try {
      const { songs } = await songPicApi({ ids })
      pics = songs.map((song) => song.al.picUrl.replace('http://', 'https://'))
    } catch (e) {
      console.error('接口取消 或 (网络不佳，请使用自建接口或者代理)')
    } finally {
      return { pics, keywords, offset }
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // {keyword: '搜索关键词'}
    history: [],
    // {name: '歌曲名', id: '歌曲id', pic: '歌曲封面', artist: '歌手名', duration: '时长'}
    songs: [],
    // 搜索缓存，key为搜索关键词，value为缓存Map，默认最多缓存5组
    songsCache: {}
  },
  reducers: {
    clearHistory: (state) => {
      state.history = []
      state.songsCache = {}
    },
    saveHistory: (state, action) => {
      const { keywords } = action.payload
      if (keywords === '') return
      // 保存历史记录
      if (!state.history.includes(keywords)) {
        if (state.history.length >= 20) {
          state.history.shift()
        }
        state.history.push(keywords)
      }
    },
    // 通过歌曲缓存设置歌曲列表
    setSongsByCache: (state, action) => {
      state.songs = action.payload
    },
    clearSongs: (state) => {
      state.songs = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByKeywords.fulfilled, (state, action) => {
        const { songs, keywords, offset } = action.payload
        state.songs = [...state.songs, ...songs]
        // 搜索缓存
        songsCacheHandler(state.songsCache, { songs, keywords, offset })
      })
      .addCase(songPicByIds.fulfilled, (state, action) => {
        const { pics, keywords, offset } = action.payload
        if (state.songs[offset]) {
          for (let i = 0; i < pics.length; i++) {
            state.songs[offset + i].pic = pics[i]
          }
          // 搜索缓存
          songsCacheHandler(state.songsCache, {
            songs: state.songs,
            keywords,
            offset
          })
        }
      })
  }
})

export const { clearHistory, saveHistory, setSongsByCache, clearSongs } = searchSlice.actions
export const state = searchSlice.getInitialState()
export default searchSlice.reducer

// 在限制内通过折半查找最大数量
const binarySearch = async ({ keywords, offset = 0, limit = 30 }) => {
  let left = offset,
    right = offset + limit - 1
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    try {
      const {
        result: { songs }
      } = await searchApi({ keywords, offset: mid, limit: 1 })
      if (songs && songs.length !== 0) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    } catch (e) {
      console.error('接口取消 或 (网络不佳，请使用自建接口或者代理)')
    }
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }
  if (left - 1 <= offset) return []
  const { result } = await searchApi({ keywords, offset, limit: left - offset - 1 })
  return result.songs
}

function songsCacheHandler(songsCache, { keywords, songs, offset }) {
  // 搜索缓存
  if (!songsCache[keywords]) {
    // 关键词缓存最多5条
    if (Object.keys(songsCache).length > 5) {
      // 删除缓存数据最少的那条
      let key = Object.keys(songsCache).reduce((pre, cur) =>
        songsCache[cur].size - songsCache[pre].size >= 0 ? pre : cur
      )
      delete songsCache[key]
    }
    songsCache[keywords] = {}
  }
  // 每个关键词最多缓存60组数据
  let songPages = songsCache[keywords],
    page = offset / 30 + 1
  if (page > 2) return songsCache
  songPages[page] = songs

  return songsCache
}
