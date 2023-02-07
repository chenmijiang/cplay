import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import Coverwrap from './Coverwrap'
import Glasscover from './Glasscover'
import Lyricsedit from './Lyricsedit'
import PlayProgressbar from '@/components/PlayProgressbar'
import UploadFilesBox from '@/components/UploadFilesBox'
import Portal from '@/components/common/Portals'

import player from '@/store/player'
import lyrics from '@/store/lyrics'
import upload from '@/store/upload'

import { secondsToFormat } from '@/utils/time_parser'
import { setKeyEvents, clearKeyEvents } from '@/utils/keyEvent'
import style from './home.module.scss'

function HomePage({
  pausedState,
  scrolledState,
  editedState,
  timesState,
  currentIndexState,
  nameState,
  artistState,
  lyricsState,
  picUrlState,
  currentTimeState,
  durationState,
  bufferedState,
  uploadedState,
  playPauseDispatch,
  setTargetTimeDispatch,
  uploadBoxShowDispatch,
  setEditedDispatch,
  updateTimeDispatch,
  updateCurrentIndexDispatch,
  uploadStateDispatch,
}) {
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
      if (editedState) {
        switch (event.key.toLowerCase()) {
          // 添加时间轴
          case 'enter':
            if (currentIndexState < lyricsState.length - 1) {
              let index = currentIndexState + 1
              updateCurrentIndexDispatch(index)
              updateTimeDispatch(secondsToFormat(currentTimeState), index)
            }
            break
          default:
            break
        }
      }
    },
    [
      pausedState,
      playPauseDispatch,
      editedState,
      currentIndexState,
      lyricsState,
      updateCurrentIndexDispatch,
      updateTimeDispatch,
      currentTimeState,
    ]
  )

  useEffect(() => {
    if (!uploadedState) {
      setKeyEvents(keyEvents)
    } else {
      clearKeyEvents()
    }
    return () => clearKeyEvents()
  }, [uploadedState, keyEvents])
  const closeUploadBox = useCallback(
    (bool) => uploadBoxShowDispatch(bool),
    [uploadBoxShowDispatch]
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
          coverUrl={picUrlState}
          paused={pausedState}
          scrolled={scrolledState}
          playPause={playPauseDispatch}
        />
        {/* <!--歌词编辑区--> */}
        <Lyricsedit
          pausedState={pausedState}
          currentTimeState={currentTimeState}
          editedState={editedState}
          lytimesState={timesState}
          currentIndexState={currentIndexState}
          nameState={nameState}
          artistState={artistState}
          lyricsState={lyricsState}
          uploadBoxShowDispatch={uploadBoxShowDispatch}
          setEditedDispatch={setEditedDispatch}
          updateTimeDispatch={updateTimeDispatch}
          updateCurrentIndexDispatch={updateCurrentIndexDispatch}
          uploadStateDispatch={uploadStateDispatch}
          playPauseDispatch={playPauseDispatch}
        />
      </div>
      <PlayProgressbar
        current={secondsToFormat(isDrag ? current : currentTimeState, 0)}
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
      <Glasscover targetUrl={picUrlState} />
      <Portal>
        <AnimatePresence>
          {uploadedState && <UploadFilesBox closeUploadBox={closeUploadBox} />}
        </AnimatePresence>
      </Portal>
    </motion.div>
  )
}

const mapStateToProps = (state) => {
  return {
    pausedState: state.player.paused,
    scrolledState: state.player.scrolled,
    bufferedState: state.player.buffered,
    durationState: state.player.duration,
    currentTimeState: state.player.currentTime,
    uploadedState: state.lyricsEdit.uploaded,
    editedState: state.lyricsEdit.edited,
    timesState: state.lyricsEdit.times,
    currentIndexState: state.lyricsEdit.currentIndex,
    nameState: state.uploadFiles.name,
    artistState: state.uploadFiles.artist,
    lyricsState: state.uploadFiles.lyrics,
    picUrlState: state.uploadFiles.picUrl,
  }
}

const mapDispatchToProps = {
  playPauseDispatch: player.actions.playPause,
  setTargetTimeDispatch: player.actions.setTargetTime,
  uploadBoxShowDispatch: lyrics.actions.uploadBoxShow,
  setEditedDispatch: lyrics.actions.setEdited,
  updateTimeDispatch: lyrics.actions.updateTime,
  updateCurrentIndexDispatch: lyrics.actions.updateCurrentIndex,
  uploadStateDispatch: upload.actions.uploadState,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
