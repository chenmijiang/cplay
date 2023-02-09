import {
  UPLOAD_LYRICS,
  UPLOAD_MUSIC,
  UPLOAD_STATE,
  IS_SAME_URL,
  SONG_URL,
  PIC_URL
} from './type'

export default function name(preState = {}, action) {
  let newState = JSON.parse(JSON.stringify(preState))
  switch (action.type) {
    case UPLOAD_LYRICS:
      newState.lyrics = action.lyrics
      return newState
    case UPLOAD_MUSIC:
      let { src, name, artist, picUrl, sameUrled } = action.music
      newState.src = src
      newState.name = name
      newState.artist = artist
      newState.picUrl = picUrl
      newState.sameUrled = sameUrled
      return newState
    case UPLOAD_STATE:
      newState.uploadedState = action.uploadedState
      return newState
    case IS_SAME_URL:
      newState.sameUrled = action.sameUrled
      return newState
    case SONG_URL:
      newState.src = action.src
      return newState
    case PIC_URL:
      newState.picUrl = action.picUrl
      return newState
    default:
      return preState
  }
}
