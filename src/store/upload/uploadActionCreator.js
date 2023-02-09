import {
  UPLOAD_LYRICS,
  UPLOAD_MUSIC,
  UPLOAD_STATE,
  IS_SAME_URL,
  PIC_URL
} from './type'

export function uploadLyrics(lyrics) {
  return {
    type: UPLOAD_LYRICS,
    lyrics,
  }
}

/**
 * music{ src, name, artist, picUrl, sameUrled }
 * @param {*} music
 * @returns
 */
export function uploadMusicWay2(music) {
  return {
    type: UPLOAD_MUSIC,
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

export function uploadPicUrl(picUrl) {
  return {
    type: PIC_URL,
    picUrl
  }
}
