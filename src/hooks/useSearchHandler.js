import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { saveHistory, searchByKeywords, setSongsByCache, songPicByIds } from '@/store/search.slice'

export default function useSearchHandler() {
  // 加载动画
  const [[isLoading, isError], setLoadingState] = useState([true, false])
  // 歌曲缓存
  const songsCache = useSelector((state) => state.search.songsCache)
  const dispatch = useDispatch()

  /**
   * 通过缓存或远程获取歌曲
   */
  const fetchSongs = useCallback((keywords, page) => {
    setLoadingState([true, false])
    if (songsCache[keywords] && songsCache[keywords][page]) {
      // 歌曲缓存中获取歌曲列表
      let songs = []
      for (let i = 1; i <= page; i++) {
        songs = [...songs, ...songsCache[keywords][i]]
      }
      dispatch(setSongsByCache(songs))
      setLoadingState([false, false])
    } else {
      // 保存历史记录
      dispatch(saveHistory({ keywords }))
      // 通过接口获取歌曲列表
      dispatch(searchByKeywords({ keywords, offset: (page - 1) * 30 })).then(
        ({ payload }) => {
          const songs = (payload && payload.songs) || []
          if (songs.length > 0) {
            dispatch(
              songPicByIds({
                ids: songs.map((song) => song.id).join(','),
                keywords,
                offset: (page - 1) * 30,
              })
            ).then(() => {
              setLoadingState([false, false])
            })
          } else {
            setLoadingState([false, true])
          }
        }
      )
    }
  }, [dispatch, songsCache])

  return { isLoading, isError, fetchSongs }
}