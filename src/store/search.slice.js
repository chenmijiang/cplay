import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { search as searchApi, songPic as songPicApi } from '@/apis'

export const searchByKeywords = createAsyncThunk('search/search', async ({ keywords, offset }) => {
  const { result } = await searchApi({ keywords, offset, type: 1 })
  let songs = result.songs.map(song => {
    return {
      id: song.id,
      name: song.name,
      artist: song.artists.map(artist => artist.name).join('/'),
    }
  })
  return { songs, keywords, offset }
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
    history: ['周杰伦', '林俊杰', '陈奕迅', '张学友', '张杰', '王力宏', '张国荣', '李荣浩', '李宗盛', '张碧晨'],
    // {name: '歌曲名', id: '歌曲id', pic: '歌曲封面', artist: '歌手名'}
    songs: [],
    // 搜索缓存，key为搜索关键词，value为缓存Map，默认最多缓存5组
    songsCache: {}
  },
  reducers: {
    clearHistory: (state) => {
      state.history = []
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
          state.songs[i].pic = action.pics[i]
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

export const { clearHistory } = searchReducer.actions
export const state = searchReducer.getInitialState()
export default searchReducer.reducer