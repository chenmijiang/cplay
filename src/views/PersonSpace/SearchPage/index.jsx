import React, { useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import useKeyEvents from '@/hooks/useKeyEvents'
import { clearSongs } from '@/store/search.slice'

import { LoadAnimations } from '@/components/common/LazyLoad'

import SearchInput from './SearchInput'
import HistoryPanel from './HistoryPanel'
import SearchResult from './SearchResult'

import { pageVariant } from '@/variants'
import useSearchHandler from '@/hooks/useSearchHandler'

const SearchPage = () => {
  const currentPageRef = useRef(1)
  const dispatch = useDispatch()
  const { isLoading, fetchSongs } = useSearchHandler()
  // 2. 引用传递：搜索框的值，通过ref传递给子组件
  const keywordsRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  // 0. 搜索：搜索框的搜索事件,触发方式：1.回车事件 2.点击搜索按钮 3.点击历史记录 4. 滚动到底部
  const searchHandler = useCallback(
    (keywords, page = 1) => {
      if (keywords !== searchParams.get('keywords')) {
        console.log('clear')
        currentPageRef.current = 1
        dispatch(clearSongs())
      }
      fetchSongs(keywords, page)
      // 设置路由参数
      setSearchParams((pre) => ({ ...pre, keywords }))
    },
    [setSearchParams, dispatch, searchParams, fetchSongs]
  )
  // 1. 挂载：监听初始路由参数。如果有参数，就搜索，否则就显示历史记录
  useEffect(() => {
    const keywords = searchParams.get('keywords')
    if (keywords) {
      keywordsRef.current.value = keywords
      searchHandler(keywords)
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
    <SearchPageWrapper
      variants={pageVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="searchPage"
    >
      <SearchInput
        ref={keywordsRef}
        searchHandler={searchHandler}
      />
      {searchParams.get('keywords') ? (
        isLoading === true ? (
          <LoadingWrapper>
            <LoadAnimations />
          </LoadingWrapper>
        ) : (
          <SearchResult searchHandler={searchHandler} />
        )
      ) : (
        <HistoryPanel restoreHistory={restoreHistoryHandler} />
      )}
    </SearchPageWrapper>
  )
}

const SearchPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
`
const LoadingWrapper = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
`

export default SearchPage
