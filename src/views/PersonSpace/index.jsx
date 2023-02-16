import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { playPause, setTargetTime } from '@/store/play.slice'

import SideNavbar from './SideNavbar'
import MinimusicPlaybar from '@/components/MinimusicPlaybar'

import { secondsToFormat } from '@/utils/time_parser'
import { setKeyEvents, clearKeyEvents } from '@/utils/keyEvent'

import style from './personspace.module.scss'

const PersonSpace = () => {
  const { paused, buffered, duration, currentTime, name, artist, picUrl } =
    useSelector((state) => ({ ...state.player, ...state.uploadFiles }))
  const dispatch = useDispatch()

  // 设置进度条拖拽
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)
  // 设置 键盘快捷键
  useEffect(() => {
    const keyEvents = (evt) => {
      let event = evt || window.event
      switch (event.key.toLowerCase()) {
        case ' ': // 暂停播放和开始播放
          dispatch(playPause(!paused))
          break
        default:
          break
      }
    }

    setKeyEvents(keyEvents)
    return () => clearKeyEvents()
  }, [paused, dispatch])

  return (
    <motion.div
      className={style.personspace_page_body}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut',
      }}
    >
      <div className={style.headerbar_body} />
      <div className={style.sidebar_body}>
        <SideNavbar />
      </div>
      <motion.div
        className={style.playbar_body}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        <MinimusicPlaybar
          song={name}
          artist={artist}
          paused={paused}
          playPause={(payload) => {
            dispatch(playPause(payload))
          }}
          picUrl={picUrl}
          currentTime={secondsToFormat(isDrag ? current : currentTime, 0)}
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
      </motion.div>
      <div className={style.content}>
        <SimpleBar
          className="space_dashboard"
          style={{ height: 'inherit' }}
        >
          <Outlet />
        </SimpleBar>
      </div>
    </motion.div>
  )
}

export default PersonSpace
