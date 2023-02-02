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
import upload from '@/store/upload'

import { secondsToFormat } from '@/utils/time_parser'
// import { setKeyEvents, clearKeyEvents } from '@/utils/keyEvent'
import style from './home.module.scss'

function HomePage({
  /* state */
  paused,
  scrolled,
  editedState,
  timesState,
  currentIndexState,
  nameState,
  artistState,
  lyricsState,
  picUrl,
  currentTime,
  duration,
  buffered,
  uploaded,
  /* dispatch */
  playPauseDispath,
  setTargetTime,
  uploadBoxShow,
  setEditedDispath,
  updateTimeDispath,
  updateCurrentIndexDispath,
  uploadStateDispath,
}) {
  const [isDrag, setIsDrag] = useState(false)
  const [current, setCurrent] = useState(0)


  // const keyEvents = useCallback((evt) => {
  //   let event = evt || window.event
  //   switch (event.key.toLowerCase()) {
  //     case ' ': // 暂停播放和开始播放
  //       playPauseDispath(!paused)
  //       break
  //     default:
  //       break
  //   }
  //   if (editedState) {
  //     switch (event.key.toLowerCase()) {
  //       // 添加时间轴
  //       case 'enter':
  //         if (currentIndexState < lyricsState.length - 1) {
  //           let index = currentIndexState + 1
  //           updateCurrentIndexDispath(index)
  //           // const newTimes = [...times]
  //           // newTimes[index] = secondsToFormat(currentTime)
  //           // setTimes(newTimes)
  //           // updateTime(currentTime, index)
  //         }
  //         break
  //       default:
  //         break
  //     }
  //   }
  // },[])

  // useEffect(() => {
  //   setKeyEvents(keyEvents)
  //   return () => clearKeyEvents()
  // }, [keyEvents])

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
          playPause={playPauseDispath}
        />
        {/* <!--歌词编辑区--> */}
        <Lyricsedit
          pausedState={paused}
          currentTimeState={currentTime}
          editedState={editedState}
          lytimesState={timesState}
          currentIndexState={currentIndexState}
          nameState={nameState}
          artistState={artistState}
          lyricsState={lyricsState}
          uploadBoxShowDispath={uploadBoxShow}
          setEditedDispath={setEditedDispath}
          updateTimeDispath={updateTimeDispath}
          updateCurrentIndexDispath={updateCurrentIndexDispath}
          uploadStateDispath={uploadStateDispath}
          playPauseDispath={playPauseDispath}
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
          setTargetTime(percent * duration)
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
          {uploaded && (
            <UploadFilesBox
              closeUploadBox={(bool) => {
                uploadBoxShow(bool)
              }}
            />
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
    editedState: state.lyricsEdit.edited,
    timesState: state.lyricsEdit.times,
    currentIndexState: state.lyricsEdit.currentIndex,
    nameState: state.uploadFiles.name,
    artistState: state.uploadFiles.artist,
    lyricsState: state.uploadFiles.lyrics,
    picUrl: state.uploadFiles.picUrl,
  }
}

const mapDispathToProps = {
  playPauseDispath: player.actions.playPause,
  setTargetTime: player.actions.setTargetTime,
  uploadBoxShow: lyrics.actions.uploadBoxShow,
  setEditedDispath: lyrics.actions.setEdited,
  updateTimeDispath: lyrics.actions.updateTime,
  updateCurrentIndexDispath: lyrics.actions.updateCurrentIndex,
  uploadStateDispath: upload.actions.uploadState,
}

export default connect(mapStateToProps, mapDispathToProps)(HomePage)
