import React, { useState } from 'react'
import { connect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import Coverwrap from './Coverwrap'
import Glasscover from './Glasscover'
import Lyricsedit from './Lyricsedit'
import PlayProgressbar from '@/components/PlayProgressbar'
import UploadFilesBox from '@/components/UploadFilesBox'
import Portal from '@/components/Portals'

import player from '@/store/player'
import lyrics from '@/store/lyrics'

import { secondsToFormat } from '@/utils/time_parser'
import style from './home.module.scss'

function HomePage({
  /* state */
  paused,
  scrolled,
  picUrl,
  currentTime,
  duration,
  buffered,
  uploaded,
  uploadedState,
  /* dispatch */
  playPause,
  setTargetTime,
  uploadBoxShow,
}) {
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)

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
          playPause={playPause}
        />
        {/* <!--歌词编辑区--> */}
        {
          //uploadedState !== 0
          true && <Lyricsedit uploadedState={uploadedState}></Lyricsedit>
        }
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
          setTargetTime(percent * duration)
        }}
        setCurrentTime={(percent, isD) => {
          if (isDrag !== isD) {
            setIsDrag(isD)
          }
          setCurrent(percent * duration)
        }}
      ></PlayProgressbar>
      <Glasscover targetUrl={picUrl} />
      <Portal>
        <AnimatePresence>
          {uploaded && (
            <UploadFilesBox
              closeUploadBox={(bool) => {
                uploadBoxShow(bool)
              }}
            ></UploadFilesBox>
          )}
        </AnimatePresence>
      </Portal>
    </motion.div>
  )
}

const mapStateToProps = (state) => {
  return {
    paused: state.player.paused,
    scrolled: state.player.scrolled,
    buffered: state.player.buffered,
    duration: state.player.duration,
    currentTime: state.player.currentTime,
    uploaded: state.lyricsEdit.uploaded,
    uploadedState: state.uploadFiles.uploadedState,
    picUrl: state.uploadFiles.picUrl,
  }
}

const mapDispathToProps = {
  playPause: player.actions.playPause,
  setTargetTime: player.actions.setTargetTime,
  uploadBoxShow: lyrics.actions.uploadBoxShow,
}

export default connect(mapStateToProps, mapDispathToProps)(HomePage)
