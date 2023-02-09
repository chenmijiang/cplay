import {
  search as searchApi,
  songPic as songPicApi,
} from '@/apis'
import { SEARCH, SONG_PIC } from './type'

// 搜索
export const search = (keywords, offset = 0) => {
  return async dispatch => {
    const { result } = await searchApi({ keywords, offset, type: 1 })
    let songs = result.songs.map(song => {
      return {
        id: song.id,
        name: song.name,
        artist: song.artists.map(artist => artist.name).join('/'),
      }
    })
    dispatch({
      type: SEARCH,
      songs,
      keywords,
      offset
    })
  }
}

// 歌曲封面
export const songPic = ({ ids, keywords, offset }) => {
  return async dispatch => {
    const { songs } = await songPicApi({ ids })
    let pics = songs.map(song => song.al.picUrl)
    dispatch({
      type: SONG_PIC,
      pics,
      keywords,
      offset
    })
  }
}
