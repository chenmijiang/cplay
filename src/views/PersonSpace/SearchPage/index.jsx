import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import useKeyEvents from '@/hooks/useKeyEvents'
import {
  saveHistory,
  setSongsByCache,
  searchByKeywords,
  songPicByIds,
} from '@/store/search.slice'

import { LoadAnimations } from '@/components/common/LazyLoad'
import SongsDisplay from '@/components/SongsDisplay'

import SearchInput from './SearchInput'
import HistoryPanel from './HistoryPanel'

const SearchPage = () => {
  const { songsCache, songs, songCount } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  // 2. 引用传递：搜索框的值，通过ref传递给子组件
  const keywordsRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  // 0. 搜索：搜索框的搜索事件,触发方式：1.回车事件 2.点击搜索按钮 3.点击历史记录
  const searchHandler = useCallback(
    (keywords, offset = 0) => {
      // 设置路由参数
      setSearchParams((pre) => ({
        ...pre,
        keywords,
        offset,
      }))
      console.log('searchHandler - offset', offset)
      setSongLoaded(false)
      if (songsCache[keywords] && songsCache[keywords][offset]) {
        // 歌曲缓存中获取歌曲列表
        dispatch(
          setSongsByCache({
            songs: songsCache[keywords][offset],
            songCount: songsCache[keywords]['songCount'],
          })
        )
        setSongLoaded(true)
      } else {
        // 保存历史记录
        dispatch(saveHistory({ keywords }))
        // 通过接口获取歌曲列表
        dispatch(searchByKeywords({ keywords, offset })).then(({ payload }) => {
          const songs = (payload && payload.songs) || []
          if (songs.length > 0) {
            dispatch(
              songPicByIds({
                ids: songs.map((song) => song.id).join(','),
                keywords,
                offset,
              })
            ).then(() => {
              setSongLoaded(true)
            })
          } else {
            setSongLoaded(true)
          }
        })
      }
    },
    [setSearchParams, songsCache, dispatch]
  )
  // 搜索加载动画
  const [songLoaded, setSongLoaded] = useState(false)
  // 1. 挂载：监听初始路由参数。如果有参数，就搜索，否则就显示历史记录
  useEffect(() => {
    const keywords = searchParams.get('keywords')
    const offset = searchParams.get('offset')
    if (keywords && offset) {
      keywordsRef.current.value = keywords
      searchHandler(keywords, offset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 3. 事件绑定：搜索框的回车事件，通过useKeyEvents绑定
  const keyEvents = useKeyEvents()
  // 节流
  const timeId = useRef(true)
  useEffect(() => {
    // 键盘回车
    if (
      timeId.current &&
      keywordsRef.current.value !== '' &&
      keyEvents &&
      keyEvents.key === 'Enter'
    ) {
      timeId.current = false
      setTimeout(() => {
        timeId.current = true
      }, 3000)
      searchHandler(keywordsRef.current.value)
    }
  }, [keywordsRef, searchHandler, keyEvents])
  // 4. 通过历史记录跳转到详情页
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
          <SongsDisplay
            searchHandler={searchHandler}
            songs={songs}
            songCount={songCount}
          />
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
