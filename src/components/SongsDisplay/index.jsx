import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { secondsToFormat } from '@/utils/time_parser'

import ImageLazy from '@/components/common/ImageLazy'
import Pagination from '@/components/Pagination'
import { songPicAndUrl } from '@/store/upload.slice'
import { playPause } from '@/store/play.slice'

const SongsDisplay = React.memo(({ searchHandler, songs, songCount }) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  let keywords = searchParams.get('keywords')
  let offset = searchParams.get('offset')
  // 1. 获取 歌曲列表 和 歌曲总数(传参)
  // 2. 处理分页跳转操作
  const changePageHandler = useCallback(
    (page) => {
      setSearchParams((pre) => ({
        ...pre,
        offset: page - 1,
      }))
      searchHandler(keywords, page - 1)
    },
    [keywords, setSearchParams, searchHandler]
  )
  // 3. 处理歌曲跳转操作
  const getAudioAndPic = (e) => {
    // 1. e.target 为 song_item 元素
    if (
      e.target.classList.contains('song_item') ||
      e.target.parentElement.classList.contains('song_item')
    ) {
      dispatch(playPause(true))
      let name, artist, id
      if (e.target.classList.contains('song_item')) {
        id = e.target.getAttribute('data')
        ;[name, artist] = e.target.innerText.split('\n')
      } else {
        id = e.target.parentElement.getAttribute('data')
        ;[name, artist] = e.target.parentElement.innerText.split('\n')
      }
      dispatch(songPicAndUrl({ id, name, artist }))
    }
    // 2. e.target.parentElement 为 song_item 元素
    // if (e.target.parentElement.className === 'song_item') {
    //   let id = e.target.parentElement.getAttribute('data')
    //   // dispatch(songPicAndUrl({ id }))
    // }
  }
  // 处理分页跳转操作
  // 获取播放音频和图片链接

  return (
    <SongsResultWrapper>
      {songs.length === 0 ? (
        <p>找不到。。。换个词试试~</p>
      ) : (
        <>
          {/* 展示 */}
          <div
            className="songitems"
            onClick={getAudioAndPic}
          >
            {songs.map((song) => {
              return (
                <SongItems
                  key={song.id}
                  {...song}
                />
              )
            })}
          </div>
          {/* 分页 */}
          {parseInt(songCount / 30) > 1 && (
            <Pagination
              page={offset ? parseInt(offset) + 1 : 1}
              itemsPerPage={30}
              totalItems={songCount}
              onChangePage={changePageHandler}
            />
          )}
        </>
      )}
    </SongsResultWrapper>
  )
})

function SongItems({ id, pic, name, artist, duration }) {
  return (
    <SongItemsWrapper
      className="song_item"
      data={id}
    >
      {/* 图片懒加载 */}
      <ImageLazy
        className="record"
        src={pic}
        iconame="record"
        root="#root"
      />
      <div
        className="name"
        title={name}
      >
        {name}
      </div>
      <div
        className="artist"
        artist={artist}
      >
        {artist}
      </div>
      <div
        className="duration"
        duration={duration}
      >
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
  grid-template-columns: 90px 500px 200px 1fr 100px;
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

export default SongsDisplay
