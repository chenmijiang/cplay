import React from 'react'

import Progressbar from '@/components/Progressbar'

function PlayProgressbar({
  setCurrentPercent,
  setCurrentTime,
  current,
  curPercent,
  prePercent,
  duration,
}) {
  return (
    <div style={style.p_container}>
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
      ></Progressbar>
      <span>{duration}</span>
    </div>
  )
}

const style = {
  p_container: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    height: '64px',
    padding: '0 5%',
    color: 'var(--font-white-100)',
    userSelect: 'none',
  },
}

export default PlayProgressbar
