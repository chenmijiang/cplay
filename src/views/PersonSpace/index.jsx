/** @format */

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { playPause, setTargetTime } from '@/store/play.slice'

import SideNavbar from './SideNavbar'
import MinimusicPlaybar from '@/components/MinimusicPlaybar'

import { secondsToFormat } from '@/utils/time_parser'

import style from './personspace.module.scss'

const PersonSpace = () => {
  const { paused, buffered, duration, currentTime } = useSelector((state) => ({
    paused: state.player.paused,
    buffered: state.player.buffered,
    duration: state.player.duration,
    currentTime: state.player.currentTime
  }))
  const { name, artist, picUrl } = useSelector((state) => ({
    name: state.uploadFiles.name,
    artist: state.uploadFiles.artist,
    picUrl: state.uploadFiles.picUrl
  }))
  const dispatch = useDispatch()

  // 设置进度条拖拽
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)

  return (
    <motion.div
      className={style.personspace_page_body}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut'
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
        <SimpleBar className="space_dashboard" style={{ height: 'inherit' }}>
          <Outlet />
        </SimpleBar>
      </div>
    </motion.div>
  )
}

export default PersonSpace
