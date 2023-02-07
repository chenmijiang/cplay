import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SimpleBar from 'simplebar-react'

import player from '@/store/player'

import SideNavbar from './SideNavbar'
import MinimusicPlaybar from '@/components/MinimusicPlaybar'

import { secondsToFormat } from '@/utils/time_parser'
import { setKeyEvents, clearKeyEvents } from '@/utils/keyEvent'

import style from './personspace.module.scss'

const PersonSpace = ({
  pausedState,
  picUrlState,
  nameState,
  artistState,
  currentTimeState,
  durationState,
  bufferedState,
  playPauseDispatch,
  setTargetTimeDispatch,
}) => {
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)

  const keyEvents = useCallback(
    (evt) => {
      let event = evt || window.event
      switch (event.key.toLowerCase()) {
        case ' ': // 暂停播放和开始播放
          playPauseDispatch(!pausedState)
          break
        default:
          break
      }
    },
    [playPauseDispatch, pausedState]
  )
  useEffect(() => {
    setKeyEvents(keyEvents)
    return () => clearKeyEvents()
  }, [keyEvents])

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
          song={nameState}
          artist={artistState}
          paused={pausedState}
          playPause={playPauseDispatch}
          picUrl={picUrlState}
          currentTime={secondsToFormat(isDrag ? current : currentTimeState, 0)}
          duration={secondsToFormat(durationState, 0)}
          curPercent={currentTimeState / durationState}
          prePercent={bufferedState}
          setCurrentPercent={(percent, isD) => {
            if (isDrag !== isD) {
              setIsDrag(isD)
            }
            setTargetTimeDispatch(percent * durationState)
          }}
          setCurrentTime={(percent, isD) => {
            if (isDrag !== isD) {
              setIsDrag(isD)
            }
            setCurrent(percent * durationState)
          }}
        />
      </motion.div>
      <div className={style.content}>
        <SimpleBar className={style.dashboard}>
          <Dashboard />
        </SimpleBar>
      </div>
    </motion.div>
  )
}

function Dashboard() {
  return (
    <>
      <Outlet />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    pausedState: state.player.paused,
    scrolledState: state.player.scrolled,
    bufferedState: state.player.buffered,
    durationState: state.player.duration,
    currentTimeState: state.player.currentTime,
    nameState: state.uploadFiles.name,
    artistState: state.uploadFiles.artist,
    picUrlState: state.uploadFiles.picUrl,
  }
}

const mapDispatchToProps = {
  playPauseDispatch: player.actions.playPause,
  setTargetTimeDispatch: player.actions.setTargetTime,
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSpace)
