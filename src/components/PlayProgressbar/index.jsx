import React from 'react'
import styled from 'styled-components'

import Progressbar from '@/components/Progressbar'

const PlayProgressbar = React.memo(
  ({
    setCurrentPercent,
    setCurrentTime,
    current,
    curPercent,
    prePercent,
    duration,
  }) => {
    return (
      <PlayContainer>
        <span>{current}</span>
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
        <span>{duration}</span>
      </PlayContainer>
    )
  }
)

const PlayContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 0 5%;
  gap: 10px;
  color: var(--font-white-100);
  user-select: none;
`

export default PlayProgressbar
