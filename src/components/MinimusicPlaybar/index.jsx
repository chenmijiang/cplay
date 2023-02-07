import React from 'react'

import Icon from '@/components/common/IconSvg'
import Progressbar from '@/components/Progressbar'

import styled from 'styled-components'

const MinimusicPlaybar = React.memo(
  ({
    paused,
    playPause,
    picUrl,
    song,
    artist,
    currentTime,
    duration,
    curPercent,
    prePercent,
    setCurrentPercent,
    setCurrentTime,
  }) => {
    return (
      <MiniplayContent>
        <Record paused={paused}>
          {picUrl !== '' ? (
            <img
              src={picUrl}
              alt="record"
            />
          ) : (
            <Icon name="record" />
          )}
        </Record>
        <Playpause
          onClick={() => {
            playPause(!paused)
          }}
        >
          {paused ? <Icon name="pause" /> : <Icon name="play" />}
        </Playpause>
        <MiniProgressBar>
          <p
            className="song"
            title={song}
          >
            {song}
          </p>
          <p className="artist">{artist}</p>
          <p className="curtime">{currentTime}</p>
          <p className="duration">/ {duration}</p>
          <Progressbar
            curPercent={curPercent}
            prePercent={prePercent}
            setCurrentPercent={(percent, isDrag) => {
              setCurrentPercent && setCurrentPercent(percent, isDrag)
            }}
            setCurrentTime={(percent, isDrag) => {
              setCurrentTime && setCurrentTime(percent, isDrag)
            }}
          />
        </MiniProgressBar>
      </MiniplayContent>
    )
  }
)

const MiniplayContent = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const Record = styled.div`
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
    fill: ${({ paused }) =>
      paused ? 'var(--bg-gray-100)' : 'var(--bg-red-100)'};
  }
  img {
    width: inherit;
    height: inherit;
  }
`
const Playpause = styled.div`
  width: 42px;
  height: 42px;
  cursor: pointer;
  .icon {
    width: inherit;
    height: inherit;
    fill: var(--bg-gray-100);
  }
`
const MiniProgressBar = styled.div`
  flex: 1;
  display: grid;
  gap: 5px;
  grid-template-columns: 150px 100px 1fr 50px 50px;
  grid-template-rows: repeat(2, 20px);
  grid-template-areas:
    'song artist . curtime duration'
    'progress progress progress progress progress';
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--font-gray-100);
    cursor: default;
  }
  .song {
    grid-area: song;
    color: var(--font-gray-200);
  }
  .artist {
    grid-area: artist;
  }
  .curtime {
    grid-area: curtime;
    color: var(--font-gray-200);
  }
  .duration {
    grid-area: duration;
  }
  .slider_container {
    grid-area: progress;
    .progress {
      &::before {
        background-color: var(--bg-red-100);
      }
      &::after {
        background-color: var(--bg-gray-210);
      }
    }
    .slider_range {
      background-color: var(--bg-gray-224);
    }
    & .slider_range::-webkit-slider-thumb {
      background: var(--bg-gray-100);
    }
    & .slider_range::-moz-range-thumb {
      background: var(--bg-gray-100);
    }
  }
`

export default MinimusicPlaybar
