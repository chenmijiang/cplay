import {
  UPLOAD_LYRICS,
  UPLOAD_WAY,
  UPLOAD_MUSIC_WAY2,
  UPLOAD_STATE,
  IS_SAME_URL,
} from '../enum/upload'

export function uploadLyrics(lyrics) {
  return {
    type: UPLOAD_LYRICS,
    lyrics,
  }
}

export function changeWay(index) {
  return {
    type: UPLOAD_WAY,
    way: index,
  }
}

/**
 * music{ src, name, artist, picUrl, sameUrled }
 * @param {*} music
 * @returns
 */
export function uploadMusicWay2(music) {
  return {
    type: UPLOAD_MUSIC_WAY2,
    music,
  }
}

export function uploadState(state) {
  return {
    type: UPLOAD_STATE,
    uploadedState: state,
  }
}

export function uploadSameUrl(bool) {
  return {
    type: IS_SAME_URL,
    sameUrled: bool,
  }
}
