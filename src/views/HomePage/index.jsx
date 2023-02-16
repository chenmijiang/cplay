import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import Coverwrap from './Coverwrap'
import Glasscover from './Glasscover'
import Lyricsedit from './Lyricsedit'
import PlayProgressbar from '@/components/PlayProgressbar'
import UploadFilesBox from '@/components/UploadFilesBox'
import Portal from '@/components/common/Portals'

import { secondsToFormat } from '@/utils/time_parser'
import { setKeyEvents, clearKeyEvents } from '@/utils/keyEvent'
import style from './home.module.scss'
import {
  setEdited,
  updateCurrentIndex,
  updateTime,
  uploadBoxShow,
} from '@/store/lyrics.slice'
import { playPause, setTargetTime } from '@/store/play.slice'

function HomePage() {
  const {
    paused,
    scrolled,
    buffered,
    duration,
    currentTime,
    uploaded,
    edited,
    times,
    currentIndex,
    name,
    artist,
    lyrics,
    picUrl,
  } = useSelector((state) => ({
    ...state.player,
    ...state.lyricsEdit,
    ...state.uploadFiles,
  }))
  const dispatch = useDispatch()
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)

  const keyEvents = useCallback(
    (evt) => {
      let event = evt || window.event
      switch (event.key.toLowerCase()) {
        case ' ': // 暂停播放和开始播放
          dispatch(playPause(!paused))
          break
        default:
          break
      }
      if (edited) {
        switch (event.key.toLowerCase()) {
          // 添加时间轴
          case 'enter':
            if (currentIndex < lyrics.length - 1) {
              let index = currentIndex + 1
              dispatch(updateCurrentIndex(index))
              dispatch(updateTime(secondsToFormat(currentTime), index))
            }
            break
          default:
            break
        }
      }
    },
    [paused, edited, currentIndex, lyrics, currentTime, dispatch]
  )

  useEffect(() => {
    if (!uploaded) {
      setKeyEvents(keyEvents)
    } else {
      clearKeyEvents()
    }
    return () => clearKeyEvents()
  }, [uploaded, keyEvents])
  const closeUploadBox = useCallback(
    (bool) => dispatch(uploadBoxShow(bool)),
    [dispatch]
  )

  return (
    <motion.div
      className={style.home_page_body}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{
        ease: 'easeInOut',
      }}
    >
      <div className={style.home_page_contain}>
        {/* <!-- 唱片滚动及事件绑定 --> */}
        <Coverwrap
          coverUrl={picUrl}
          paused={paused}
          scrolled={scrolled}
          playPause={(bool) => {
            dispatch(playPause(bool))
          }}
        />
        {/* <!--歌词编辑区--> */}
        <Lyricsedit
          pausedState={paused}
          currentTimeState={currentTime}
          editedState={edited}
          lytimesState={times}
          currentIndexState={currentIndex}
          nameState={name}
          artistState={artist}
          lyricsState={lyrics}
          uploadBoxShowDispatch={(bool) => {
            dispatch(uploadBoxShow(bool))
          }}
          setEditedDispatch={(bool) => {
            dispatch(setEdited(bool))
          }}
          updateTimeDispatch={(time, index) => {
            dispatch(updateTime({ time, index }))
          }}
          updateCurrentIndexDispatch={(index) => {
            dispatch(updateCurrentIndex(index))
          }}
          // uploadStateDispatch={uploadStateDispatch}
          playPauseDispatch={(bool) => {
            dispatch(playPause(bool))
          }}
        />
      </div>
      <PlayProgressbar
        current={secondsToFormat(isDrag ? current : currentTime, 0)}
        duration={secondsToFormat(duration, 0)}
        curPercent={currentTime / duration}
        prePercent={buffered}
        setCurrentPercent={(percent, isD) => {
          if (isDrag !== isD) {
            setIsDrag(isD)
          }
          dispatch(setTargetTime(percent * duration))
        }}
        setCurrentTime={(percent, isD) => {
          if (isDrag !== isD) {
            setIsDrag(isD)
          }
          setCurrent(percent * duration)
        }}
      />
      <Glasscover targetUrl={picUrl} />
      <Portal>
        <AnimatePresence>
          {uploaded && <UploadFilesBox closeUploadBox={closeUploadBox} />}
        </AnimatePresence>
      </Portal>
    </motion.div>
  )
}

export default HomePage
