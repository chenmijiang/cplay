/** @format */

import React, { useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { clearSongs } from '@/store/search.slice'

import SearchInput from './SearchInput'
import HistoryPanel from './HistoryPanel'
import SearchResult from './SearchResult'

import { routerSwitchVariant } from '@/variants'
import useSearchHandler from '@/hooks/useSearchHandler'

const SearchPage = () => {
  const dispatch = useDispatch()
  // 获取路由参数
  const [searchParams, setSearchParams] = useSearchParams()
  // 当前页
  const currentPageRef = useRef(1)
  // 获取音频
  const { isLoading, isError, fetchSongs } = useSearchHandler()
  // 搜索, 触发方式：1.键盘回车 2.点击搜索按钮 3.点击历史记录 4. 滚动到底部
  const searchHandler = useCallback(
    (keywords, page = 1) => {
      if (keywords !== searchParams.get('keywords')) {
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
    if (searchParams.get('keywords')) {
      searchHandler(searchParams.get('keywords'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SearchPageWrapper
      variants={routerSwitchVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="searchPage"
    >
      <SearchInput searchHandler={searchHandler} />
      {searchParams.get('keywords') ? (
        <SearchResult
          searchHandler={searchHandler}
          currentPageRef={currentPageRef}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <HistoryPanel searchHandler={searchHandler} />
      )}
    </SearchPageWrapper>
  )
}

const SearchPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
`

export default SearchPage
