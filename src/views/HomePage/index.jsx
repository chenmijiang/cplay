/** @format */

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
import { updateCurrentIndex, updateTime, uploadBoxShow } from '@/store/lyrics.slice'
import { playPause, setTargetTime } from '@/store/play.slice'

function HomePage() {
  const { paused, buffered, duration, currentTime, scrolled } = useSelector((state) => ({
    paused: state.player.paused,
    buffered: state.player.buffered,
    duration: state.player.duration,
    currentTime: state.player.currentTime,
    scrolled: state.player.scrolled
  }))
  const { edited, uploaded, currentIndex } = useSelector((state) => ({
    edited: state.lyricsEdit.edited,
    uploaded: state.lyricsEdit.uploaded,
    currentIndex: state.lyricsEdit.currentIndex
  }))
  const { lyrics, picUrl } = useSelector((state) => ({
    lyrics: state.uploadFiles.lyrics,
    picUrl: state.uploadFiles.picUrl
  }))
  const dispatch = useDispatch()
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)

  const keyEvents = useCallback(
    (evt) => {
      let event = evt || window.event
      switch (event.key.toLowerCase()) {
        case ' ': // 暂停播放和开始播放
          event.preventDefault()
          dispatch(playPause(!paused))
          break
        default:
          break
      }
      if (edited) {
        switch (event.key.toLowerCase()) {
          // 添加时间轴
          case 'enter':
            event.preventDefault()
            if (currentIndex < lyrics.length - 1) {
              let index = currentIndex + 1
              dispatch(updateCurrentIndex(index))
              dispatch(updateTime({ time: secondsToFormat(currentTime), index: index }))
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
  const closeUploadBox = useCallback((bool) => dispatch(uploadBoxShow(bool)), [dispatch])

  return (
    <motion.div
      className={style.home_page_body}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{
        ease: 'easeInOut'
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
        <Lyricsedit />
      </div>
      <div className={style.home_page_progress}>
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
      </div>
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
