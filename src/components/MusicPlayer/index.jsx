import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import player from '@/store/player'
import lyrics from '@/store/lyrics'
import { setCurrentIndex } from '@/utils/common'
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
    /* state */
    src,
    paused,
    targetTime,
    volume,
    edited,
    times,
    currentIndex,
    /* dispatch */
    setCurrentTime,
    setDuration,
    setBuffered,
    end,
    setCoverScroll,
    updateCurrentIndex,
  }) => {
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
      setCurrentTime(targetTime)
    }, [targetTime, setCurrentTime])
    //设置音量
    useEffect(() => {
      player.current.volume = volume
    }, [volume])

    const handleLoadedData = (e) => {
      loadedDataHandler(e, ({ e }) => {
        setDuration(e.target.duration)
      })
    }
    const handleProgress = (e) => {
      progressHandler(e)
    }
    const handleTimeUpdate = (e) => {
      timeUpdateHandler(e, ({ e, value }) => {
        let time = e.target.currentTime
        setCurrentTime(time)
        setBuffered(value)
        if (!edited) {
          let index = setCurrentIndex(time, times)
          index !== currentIndex && updateCurrentIndex(index)
        }
      })
    }
    const handleEnded = (e) => {
      endedHandler(e, ({ e }) => {
        end()
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
        setCoverScroll(false)
      })
    }

    const handleCanPlay = (e) => {
      clearTimeout(networkId)
      canplayHandler(e, ({ e }) => {
        setCoverScroll(true)
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
  }
)

const mapStateToProps = (state) => {
  return {
    paused: state.player.paused,
    currentTime: state.player.currentTime,
    targetTime: state.player.targetTime,
    volume: state.player.volume,
    edited: state.lyricsEdit.edited,
    times: state.lyricsEdit.times,
    currentIndex: state.lyricsEdit.currentIndex,
    src: state.uploadFiles.src,
  }
}

const mapDispathToProps = {
  setCurrentTime: player.actions.setCurrentTime,
  setDuration: player.actions.setDuration,
  setBuffered: player.actions.setBuffered,
  setCoverScroll: player.actions.setCoverScroll,
  end: player.actions.end,
  updateCurrentIndex: lyrics.actions.updateCurrentIndex,
}

export default connect(mapStateToProps, mapDispathToProps)(MusicPlayer)
