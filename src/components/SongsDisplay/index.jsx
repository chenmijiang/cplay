/** @format */

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useInViewport } from 'ahooks'

import { secondsToFormat } from '@/utils/time_parser'

import ImageLazy from '@/components/common/ImageLazy'
import { LoadAnimations } from '@/components/common/LazyLoad'

const SongsDisplay = React.memo(({ songs, scrollToBottom, DoubleClick, hintwords, loadMore }) => {
  // 处理点击操作(双击)
  const handleDoubleClick = (e) => {
    // 1. e.target 为 song_item 元素
    if (
      e.target.classList.contains('song_item') ||
      e.target.parentElement.classList.contains('song_item')
    ) {
      let name, artist, id
      if (e.target.classList.contains('song_item')) {
        id = e.target.getAttribute('data')
        ;[name, artist] = e.target.innerText.split('\n')
      } else {
        id = e.target.parentElement.getAttribute('data')
        ;[name, artist] = e.target.parentElement.innerText.split('\n')
      }
      DoubleClick({ id, name, artist })
    }
  }

  // 监听LoadingWrapper 是否可视，是的话加载更多数据
  const [isLoading, setIsLoading] = useState(true)
  const loadingAnimationRef = useRef(null)
  const [inViewport, ratio] = useInViewport(loadingAnimationRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  })
  const locked = useRef(false)
  useEffect(() => {
    if (inViewport && ratio >= 0.98 && !locked.current) {
      locked.current = true
      scrollToBottom(({ loading }) => {
        setIsLoading(loading)
      })
      setTimeout(() => {
        locked.current = false
      }, 5000)
    }
  }, [inViewport, ratio, scrollToBottom])

  return (
    <SongsResultWrapper>
      {songs.length === 0 ? (
        <p>{!!hintwords ? hintwords : '找不到。。。换个词试试~'}</p>
      ) : (
        <>
          {/* 展示 */}
          <div className="songitems" onDoubleClick={handleDoubleClick}>
            {songs.map((song) => {
              return <SongItems key={song.id} {...song} />
            })}
          </div>
          {/* 底部数据加载动画 */}
          {isLoading === true && loadMore === true ? (
            <LoadingWrapper ref={loadingAnimationRef}>
              <LoadAnimations />
            </LoadingWrapper>
          ) : (
            <></>
          )}
        </>
      )}
    </SongsResultWrapper>
  )
})

function SongItems({ id, pic, name, artist, duration }) {
  return (
    <SongItemsWrapper className="song_item" data={id}>
      {/* 图片懒加载和预加载 */}
      <ImageLazy className="record" src={pic} iconame="record" rootMargin="0px 0px 400px 0px" />
      <div className="name" title={name}>
        {name}
      </div>
      <div className="artist" artist={artist}>
        {artist}
      </div>
      <div className="duration" duration={duration}>
        {secondsToFormat(duration / 1000, 0)}
      </div>
    </SongItemsWrapper>
  )
}

const SongsResultWrapper = styled.div`
  margin-top: 20px;
  & > p {
    color: var(--font-gray-200);
    font-size: 15px;
    margin: 20px;
    text-align: center;
  }
  .songitems {
    width: 100%;
  }
`
const SongItemsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 90px 2fr 1fr 1fr 60px;
  grid-template-rows: 70px;
  grid-template-areas: 'record name artist . duration';
  align-items: center;
  border-bottom: 1px solid var(--bg-gray-100);
  cursor: pointer;
  .record {
    grid-area: record;
  }
  .name,
  .artist,
  .duration {
    width: 100%;
    color: var(--font-gray-100);
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 2px;
  }
  .name {
    grid-area: name;
    font-size: 20px;
    color: var(--bg-gray-200);
  }
  .artist {
    grid-area: artist;
  }
  .duration {
    grid-area: duration;
  }
`
const LoadingWrapper = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
`

export default SongsDisplay
