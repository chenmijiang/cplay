/** @format */

import React, { useCallback, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import SongsDisplay from '@/components/SongsDisplay'
import { LoadAnimations } from '@/components/common/LazyLoad'
import { playPause } from '@/store/play.slice'
import { songPicAndUrl } from '@/store/upload.slice'

import useFecthCancel from '@/hooks/useFetchCancel'
import { showToast } from '@/utils/message'

const SearchResult = React.memo(({ searchHandler, currentPageRef, isLoading, isError }) => {
  useFecthCancel()
  const dispatch = useDispatch()
  const { songs, quality } = useSelector((state) => ({
    songs: state.search.songs,
    quality: state.setting.quality
  }))
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
      // 限制刷2页数据，二分估测大概率把接口搞崩
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

  // 获取播放音频和图片链接
  const getAudioAndPic = useCallback(
    ({ id, name, artist }) => {
      dispatch(playPause(true))
      showToast('正在尝试获取音频...')
      dispatch(songPicAndUrl({ id, name, artist, br: quality }))
        .then(() => {
          showToast('获取成功')
        })
        .catch(() => {
          showToast('未知错误，获取失败')
        })
    },
    [dispatch, quality]
  )
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
          DoubleClick={getAudioAndPic}
          loadMore={true}
        />
      )}
    </div>
  )
})

const LoadingWrapper = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
`

export default SearchResult
