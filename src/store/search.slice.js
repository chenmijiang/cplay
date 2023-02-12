import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { search as searchApi, songPic as songPicApi } from '@/apis'

export const searchByKeywords = createAsyncThunk('search/search', async ({ keywords, offset }) => {
  const { result } = await searchApi({ keywords, offset, type: 1 })
  let songs = result.songs
  if (songs) {
    songs = songs.map(song => {
      return {
        id: song.id,
        name: song.name,
        artist: song.artists.map(artist => artist.name).join('/'),
        duration: song.duration
      }
    })
  } else {
    songs = []
  }
  return { songs, keywords, offset, songCount: result.songCount }
})

export const songPicByIds = createAsyncThunk('search/songPic', async ({ ids, keywords, offset }) => {
  const { songs } = await songPicApi({ ids })
  let pics = songs.map(song => song.al.picUrl)
  return { pics, keywords, offset }
})

const searchReducer = createSlice({
  name: 'search',
  initialState: {
    // {keyword: '搜索关键词'}
    history: [],
    // {name: '歌曲名', id: '歌曲id', pic: '歌曲封面', artist: '歌手名', duration: '时长'}
    songs: [],
    // 用于分页，记录当前搜索结果的总数
    songCount: 600,
    // 搜索缓存，key为搜索关键词，value为缓存Map，默认最多缓存5组
    songsCache: {}
  },
  reducers: {
    clearHistory: (state) => {
      state.history = []
    },
    // 通过歌曲缓存设置歌曲列表
    setSongsByCache: (state, action) => {
      const { songs } = action.payload
      state.songs = songs
    }
  },
  extraReducers: builder => {
    builder
      .addCase(searchByKeywords.fulfilled, (state, action) => {
        const { songs, keywords, offset } = action.payload
        state.songs = songs
        // 保存历史记录
        if (!state.history.includes(keywords)) {
          if (state.history.length >= 20) {
            state.history.shift()
          }
          state.history.push(keywords)
        }
        songsCacheHandler(state.songsCache, { songs, keywords, offset })
      })
      .addCase(songPicByIds.fulfilled, (state, action) => {
        const { pics, keywords, offset } = action.payload
        for (let i = 0; i < pics.length; i++) {
          state.songs[i].pic = pics[i]
        }
        songsCacheHandler(state.songsCache, { songs: state.songs, keywords, offset })
      })
  }
})



function songsCacheHandler(songsCache, { keywords, offset, songs }) {
  // 搜索缓存
  if (!songsCache[keywords]) {
    // 关键词缓存最多5条
    if (Object.keys(songsCache).length >= 5) {
      // 删除缓存数据最少的那条
      let key = Object.keys(songsCache).reduce((pre, cur) =>
        songsCache[cur].size - songsCache[pre].size >= 0 ?
          pre : cur
      )
      delete songsCache[key]
    }
    songsCache[keywords] = {}
  }
  // 每个关键词最多缓存10组数据
  let keys = Object.keys(songsCache[keywords])
  if (keys.length >= 10) {
    delete songsCache[keywords][keys[0]]
  }
  songsCache[keywords][offset] = songs

  return songsCache
}

export const { clearHistory, setSongsByCache } = searchReducer.actions
export const state = searchReducer.getInitialState()
export default searchReducer.reducer