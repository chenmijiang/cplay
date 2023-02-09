import { produce } from 'immer'
import { SEARCH, SONG_PIC, CLEAR_HISTORY } from './type'

const searchReducer = produce((draftState = {}, action) => {
  switch (action.type) {
    case SEARCH:
      draftState.songs = action.songs
      // 保存历史记录
      if (!draftState.history.includes(action.keywords)) {
        if (draftState.history.length >= 10) {
          draftState.history.shift()
        }
        draftState.history.push(action.keywords)
      }
      const songsCache = songsCacheHandler(draftState.songsCache, action)
      console.log('songsCache', songsCache)
      break
    case CLEAR_HISTORY:
      draftState.history = []
      break
    case SONG_PIC:
      for (let i = 0; i < action.pics.length; i++) {
        draftState.songs[i].pic = action.pics[i]
      }
      songsCacheHandler(draftState, { ...action, songs: draftState.songs })
      break
    default:
      break
  }
  return draftState
})

export default searchReducer

/**
 * 
 * @param {*} songsCache {} 
 * @param {*} options {keywords,offset,songs}
 */
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