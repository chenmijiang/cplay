import { songPic as songPicApi, songUrl as songUrlApi } from '@/apis'
import { UPLOAD_MUSIC, SONG_URL } from './type'

// 歌曲封面 && 歌曲播放地址
export const songPicAndUrl = ({ id, name, artist, br = 320000 }) => {
  return async dispatch => {
    const { data } = await songUrlApi({ id, br })
    const { songs } = await songPicApi({ ids: id })
    dispatch({
      type: UPLOAD_MUSIC,
      src: data[0].url,
      name,
      artist,
      picUrl: songs[0].al.picUrl,
    })
  }
}

// 歌曲播放地址，一段时间会失效，需要重新请求
export const songUrl = (id, br = 320000) => {
  return async dispatch => {
    const { data } = await songUrlApi({ id, br })
    dispatch({
      type: SONG_URL,
      src: data[0].url
    })
  }
}