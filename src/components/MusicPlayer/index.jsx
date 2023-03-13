/** @format */

import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentIndex } from '@/utils/common'
import { formatToSeconds } from '@/utils/time_parser'
import {
  canplayHandler,
  canPlayThroughHandler,
  endedHandler,
  errorHandler,
  loadedDataHandler,
  progressHandler,
  suspendHandler,
  timeUpdateHandler,
  waitingHandler
} from './eventHandler'
import {
  playPause,
  setBuffered,
  setCoverScroll,
  setCurrentTime,
  setDuration
} from '@/store/play.slice'
import { updateCurrentIndex } from '@/store/lyrics.slice'
import { songUrl } from '@/store/upload.slice'

import { showToast } from '@/store/toast.slice'

const MusicPlayer = React.memo(() => {
  const { paused, currentIndex, targetTime, volume, edited, times, src, id, quality } = useSelector(
    (state) => ({
      paused: state.player.paused,
      currentTime: state.player.currentTime,
      targetTime: state.player.targetTime,
      volume: state.player.volume,
      edited: state.lyricsEdit.edited,
      times: state.lyricsEdit.times,
      currentIndex: state.lyricsEdit.currentIndex,
      id: state.uploadFiles.id,
      src: state.uploadFiles.src,
      quality: state.setting.quality
    })
  )
  const dispatch = useDispatch()
  const timesRef = useRef(times.map((time) => formatToSeconds(time)))
  useEffect(() => {
    if (!edited) {
      timesRef.current = times.map((time) => formatToSeconds(time))
    }
  }, [edited, times])
  const player = useRef()
  //有关网络质量的提醒
  const [networkId, setNetworkId] = useState(0)
  //播放暂停
  useEffect(() => {
    paused ? player.current.pause() : player.current.play()
  }, [paused])
  //进度跳转
  useEffect(() => {
    player.current.currentTime = targetTime
    dispatch(setCurrentTime(targetTime))
  }, [targetTime, dispatch])
  //设置音量
  useEffect(() => {
    player.current.volume = volume
  }, [volume])

  const handleLoadedData = (e) => {
    loadedDataHandler(e, ({ e }) => {
      dispatch(setDuration(e.target.duration))
    })
  }
  const handleProgress = (e) => {
    progressHandler(e)
  }
  const handleTimeUpdate = (e) => {
    timeUpdateHandler(e, ({ e, value }) => {
      let time = e.target.currentTime
      dispatch(setCurrentTime(time))
      dispatch(setBuffered(value))
      if (!edited) {
        let index = setCurrentIndex(time, timesRef.current)
        index !== currentIndex && dispatch(updateCurrentIndex(index))
      }
    })
  }
  const handleEnded = (e) => {
    endedHandler(e, ({ e }) => {
      dispatch(playPause(true))
    })
  }
  const handleError = (e) => {
    dispatch(showToast('播放失败,尝试从新获取地址'))
    dispatch(songUrl({ id, br: quality }))
    errorHandler(e)
  }
  const handleSuspend = (e) => {
    suspendHandler(e)
  }

  const handleWaiting = (e) => {
    setNetworkId(
      setTimeout(() => {
        dispatch(showToast('网络不佳'))
      }, 20000)
    )
    waitingHandler(e, ({ e }) => {
      dispatch(setCoverScroll(false))
    })
  }

  const handleCanPlay = (e) => {
    clearTimeout(networkId)
    canplayHandler(e, ({ e }) => {
      dispatch(setCoverScroll(true))
    })
  }

  const handleCanPlayThrough = (e) => {
    canPlayThroughHandler(e, ({ e }) => {})
  }

  return (
    <div style={{ position: 'absolute', opacity: 0, zIndex: -30 }}>
      <audio
        // 来源
        src={src}
        controls
        ref={player}
        onLoadedData={handleLoadedData}
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        onSuspend={handleSuspend}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlayThrough}
      >
        {/* <source src="" /> */}
      </audio>
    </div>
  )
})

export default MusicPlayer
