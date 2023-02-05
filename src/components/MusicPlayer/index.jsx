import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import player from '@/store/player'
import lyrics from '@/store/lyrics'
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
  waitingHandler,
} from './eventHandler'

const MusicPlayer = React.memo(
  ({
    srcState,
    pausedState,
    targetTimeState,
    volumeState,
    editedState,
    timesState,
    currentIndexState,
    setCurrentTimeDispatch,
    setDurationDispatch,
    setBufferedDispatch,
    endDispatch,
    setCoverScrollDispatch,
    updateCurrentIndexDispatch,
  }) => {
    const timesRef = useRef(timesState.map((time) => formatToSeconds(time)))
    useEffect(() => {
      if (!editedState) {
        timesRef.current = timesState.map((time) => formatToSeconds(time))
      }
    }, [editedState, timesState])
    const player = useRef()
    //有关网络质量的提醒
    const [networkId, setNetworkId] = useState(0)
    //播放暂停
    useEffect(() => {
      pausedState ? player.current.pause() : player.current.play()
    }, [pausedState])
    //进度跳转
    useEffect(() => {
      player.current.currentTime = targetTimeState
      setCurrentTimeDispatch(targetTimeState)
    }, [targetTimeState, setCurrentTimeDispatch])
    //设置音量
    useEffect(() => {
      player.current.volume = volumeState
    }, [volumeState])

    const handleLoadedData = (e) => {
      loadedDataHandler(e, ({ e }) => {
        setDurationDispatch(e.target.duration)
      })
    }
    const handleProgress = (e) => {
      progressHandler(e)
    }
    const handleTimeUpdate = (e) => {
      timeUpdateHandler(e, ({ e, value }) => {
        let time = e.target.currentTime
        setCurrentTimeDispatch(time)
        setBufferedDispatch(value)
        if (!editedState) {
          let index = setCurrentIndex(time, timesRef.current)
          index !== currentIndexState && updateCurrentIndexDispatch(index)
        }
      })
    }
    const handleEnded = (e) => {
      endedHandler(e, ({ e }) => {
        endDispatch()
      })
    }
    const handleError = (e) => {
      errorHandler(e)
    }
    const handleSuspend = (e) => {
      suspendHandler(e)
    }

    const handleWaiting = (e) => {
      setNetworkId(
        setTimeout(() => {
          console.log('网络不佳')
        }, 20000)
      )
      waitingHandler(e, ({ e }) => {
        setCoverScrollDispatch(false)
      })
    }

    const handleCanPlay = (e) => {
      clearTimeout(networkId)
      canplayHandler(e, ({ e }) => {
        setCoverScrollDispatch(true)
      })
    }

    const handleCanPlayThrough = (e) => {
      canPlayThroughHandler(e, ({ e }) => {})
    }

    return (
      <div style={{ position: 'absolute', opacity: 0, zIndex: -30 }}>
        <audio
          // 来源
          src={srcState}
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
  }
)

const mapStateToProps = (state) => {
  return {
    pausedState: state.player.paused,
    currentTimeState: state.player.currentTime,
    targetTimeState: state.player.targetTime,
    volumeState: state.player.volume,
    editedState: state.lyricsEdit.edited,
    timesState: state.lyricsEdit.times,
    currentIndexState: state.lyricsEdit.currentIndex,
    srcState: state.uploadFiles.src,
  }
}

const mapDispathToProps = {
  setCurrentTimeDispatch: player.actions.setCurrentTime,
  setDurationDispatch: player.actions.setDuration,
  setBufferedDispatch: player.actions.setBuffered,
  setCoverScrollDispatch: player.actions.setCoverScroll,
  endDispatch: player.actions.end,
  updateCurrentIndexDispatch: lyrics.actions.updateCurrentIndex,
}

export default connect(mapStateToProps, mapDispathToProps)(MusicPlayer)
