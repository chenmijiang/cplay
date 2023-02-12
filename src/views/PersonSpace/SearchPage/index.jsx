import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import useKeyEvents from '@/hooks/useKeyEvents'
import {
  setSongsByCache,
  searchByKeywords,
  songPicByIds,
} from '@/store/search.slice'
import { LoadAnimations } from '@/components/common/LazyLoad'

import SearchInput from './SearchInput'
import HistoryPanel from './HistoryPanel'
import SearchResult from './SearchResult'

const SearchPage = () => {
  const { songsCache } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  // 键盘事件绑定
  const keyEvents = useKeyEvents()
  // 引用传递
  const keywordsRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  // 搜索结果是否加载完成
  const [songLoaded, setSongLoaded] = useState(false)
  // 搜索
  const searchHandler = useCallback(
    (words, offset) => {
      words = words || keywordsRef.current.value
      setSearchParams((pre) => ({
        ...pre,
        keywords: words,
        offset: offset || 0,
      }))
      setSongLoaded(false)
      // 歌曲缓存
      if (songsCache[words] && songsCache[words][offset || 0]) {
        dispatch(setSongsByCache({ songs: songsCache[words][offset || 0] }))
        setSongLoaded(true)
      } else {
        dispatch(
          searchByKeywords({ keywords: words, offset: offset || 0 })
        ).then(({ payload }) => {
          const songs = (payload && payload.songs) || []
          setSongLoaded(true)
          if (songs.length > 0) {
            dispatch(
              songPicByIds({
                ids: songs.map((song) => song.id).join(','),
                keywords: words,
                offset: offset || 0,
              })
            )
          }
        })
      }
    },
    [keywordsRef, setSearchParams, songsCache, dispatch]
  )
  // 监听初始路由参数
  useEffect(() => {
    const keywords = searchParams.get('keywords')
    const offset = searchParams.get('offset')
    if (keywords && offset) {
      keywordsRef.current.value = keywords
      searchHandler(keywords, offset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 键盘回车搜索
  useEffect(() => {
    if (
      keywordsRef.current.value !== '' &&
      keyEvents &&
      keyEvents.key === 'Enter'
    ) {
      searchHandler()
    }
  }, [keywordsRef, searchHandler, keyEvents])
  // 通过历史记录跳转到详情页
  const restoreHistoryHandler = useCallback(
    (keywords) => {
      keywordsRef.current.value = keywords
      searchHandler(keywords)
    },
    [searchHandler]
  )

  return (
    <SearchPageWrapper>
      <SearchInput
        ref={keywordsRef}
        searchHandler={searchHandler}
      />
      {searchParams.get('keywords') ? (
        songLoaded === false ? (
          <LoadAnimations />
        ) : (
          <SearchResult searchHandler={searchHandler} />
        )
      ) : (
        <HistoryPanel restoreHistory={restoreHistoryHandler} />
      )}
    </SearchPageWrapper>
  )
}

const SearchPageWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
`

export default SearchPage
