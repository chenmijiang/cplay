import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { secondsToFormat } from '@/utils/time_parser'

import Icon from '@/components/common/IconSvg'
import Pagination from '@/components/Pagination'

const SearchResult = React.memo(({ searchHandler }) => {
  const { songs, songCount } = useSelector((state) => state.search)
  const [searchParams, setSearchParams] = useSearchParams()
  let keywords = searchParams.get('keywords')
  let offset = searchParams.get('offset')
  // 处理分页跳转操作
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
  return (
    <SongsResultWrapper>
      {songs.length === 0 ? (
        <p>找不到。。。换个词试试~</p>
      ) : (
        <>
          {/* 展示 */}
          <div className="songitems">
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
          <Pagination
            page={offset ? parseInt(offset) + 1 : 1}
            itemsPerPage={30}
            totalItems={songCount}
            onChangePage={changePageHandler}
          />
        </>
      )}
    </SongsResultWrapper>
  )
})

function SongItems({ pic, name, artist, duration }) {
  return (
    <SongItemsWrapper>
      <div className="record">
        {pic ? (
          <img
            src={pic}
            alt="record"
          />
        ) : (
          <Icon name="record" />
        )}
      </div>
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
    width: 800px;
  }
`
const SongItemsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 90px 300px 100px 1fr 100px;
  grid-template-rows: 70px;
  grid-template-areas: 'record name artist . duration';
  align-items: center;
  border-bottom: 1px solid var(--bg-gray-100);
  cursor: pointer;
  .record {
    grid-area: record;
    transform: scale(0.8);
    width: 60px;
    height: 60px;
    border-radius: 10px;
    border: 1px solid var(--bg-gray-100);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 40px;
      height: 40px;
      transition: fill 0.2s;
      fill: var(--bg-gray-100);
    }
    img {
      width: inherit;
      height: inherit;
    }
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

export default SearchResult
