/** @format */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Icon from '@/components/common/IconSvg'
import Progressbar from '@/components/Progressbar'

import Image from '@/components/common/Image'
import { btnTapSpringVariant } from '@/variants'

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
    setCurrentTime
  }) => {
    const navigate = useNavigate()
    return (
      <MiniplayContent>
        <div
          className="switch_to_home"
          onClick={() => {
            navigate('/')
          }}
        >
          <Image src={picUrl} iconame="record" className="music_cover" />
        </div>
        <Playpause
          variants={btnTapSpringVariant}
          whileTap="tap"
          onClick={() => {
            playPause(!paused)
          }}
        >
          {paused ? <Icon name="pause" /> : <Icon name="play" />}
        </Playpause>
        <MiniProgressBar>
          <p className="song" title={song}>
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
  .switch_to_home {
    cursor: pointer;
    position: relative;
    &:hover {
      transition: all 0.2s;
      filter: brightness(0.8);
    }
  }
`
const Playpause = styled(motion.div)`
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
