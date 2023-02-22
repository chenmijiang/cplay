import React, { useCallback, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import SongsDisplay from '@/components/SongsDisplay'
import { LoadAnimations } from '@/components/common/LazyLoad'

const SearchResult = React.memo(
  ({ searchHandler, currentPageRef, isLoading, isError }) => {
    const songs = useSelector((state) => state.search.songs)
    // 去重
    const songsItems = useMemo(() => {
      const songIdsSet = new Set()
      return songs.filter(({ id }) => {
        if (songIdsSet.has(id)) {
          return false
        } else {
          songIdsSet.add(id)
          return true
        }
      })
    }, [songs])
    const [searchParams] = useSearchParams()
    const scrollToBottom = useCallback(
      (callback) => {
        // 限制刷2页数据，二分估测大概率把暂时搞崩
        if (currentPageRef.current < 2) {
          const keywords = searchParams.get('keywords')
          searchHandler(keywords, ++currentPageRef.current)
        } else {
          callback({ loading: false, isError: false })
        }
      },
      [currentPageRef, searchHandler, searchParams]
    )
    // 切换关键词搜索的加载动画
    const preKeywords = useRef('')
    const equalKeywords = useMemo(() => {
      let words = searchParams.get('keywords')
      if (preKeywords.current !== words) {
        preKeywords.current = words
        return true && isLoading
      } else {
        return false
      }
    }, [isLoading, searchParams])
    return (
      <div>
        {equalKeywords ? (
          <LoadingWrapper>
            <LoadAnimations />
          </LoadingWrapper>
        ) : (
          <SongsDisplay
            songs={songsItems}
            scrollToBottom={scrollToBottom}
          />
        )}
      </div>
    )
  }
)

const LoadingWrapper = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
`

export default SearchResult
