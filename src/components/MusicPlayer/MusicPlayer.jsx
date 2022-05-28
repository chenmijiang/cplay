import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import {
  setCurrentTime,
  setDuration,
  setBuffered,
  end,
  setCoverScroll,
} from '../../redux/actions/playerActionCreator'
import { updateCurrentIndex } from '../../redux/actions/lyricsEditActionCreator'
import { setCurrentIndex } from '../../utils/common'
import playerEvent from './player_event'

function MusicPlayer(props) {
  let {
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
  } = props

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

  const handleLoadedData = useCallback(
    (e) => {
      playerEvent.loadedData(e, ({ e }) => {
        setDuration(e.target.duration)
      })
    },
    [setDuration]
  )
  const handleProgress = useCallback((e) => {
    playerEvent.progress(e)
  }, [])
  const handleTimeUpdate = useCallback(
    (e) => {
      playerEvent.timeUpdate(e, ({ e, value }) => {
        let time = e.target.currentTime
        setCurrentTime(time)
        setBuffered(value)
        if (!edited) {
          let index = setCurrentIndex(time, times)
          index !== currentIndex && updateCurrentIndex(index)
        }
      })
    },
    [
      setCurrentTime,
      setBuffered,
      edited,
      times,
      currentIndex,
      updateCurrentIndex,
    ]
  )
  const handleEnded = useCallback(
    (e) => {
      playerEvent.ended(e, ({ e }) => {
        end()
      })
    },
    [end]
  )
  const handleError = useCallback((e) => {
    playerEvent.error(e)
  }, [])
  const handleSuspend = useCallback((e) => {
    playerEvent.suspend(e)
  }, [])

  const handleWaiting = useCallback(
    (e) => {
      setNetworkId(
        setTimeout(() => {
          console.log('网络不佳')
        }, 20000)
      )
      playerEvent.waiting(e, ({ e }) => {
        setCoverScroll(false)
      })
    },
    [setCoverScroll]
  )

  const handleCanPlay = useCallback(
    (e) => {
      clearTimeout(networkId)
      playerEvent.canplay(e, ({ e }) => {
        setCoverScroll(true)
      })
    },
    [setCoverScroll, networkId]
  )

  const handleCanPlayThrough = useCallback((e) => {
    playerEvent.canPlayThrough(e, ({ e }) => {})
  }, [])

  return (
    <div style={Style}>
      <audio
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

const Style = {
  position: 'absolute',
  opacity: 0,
  zIndex: -30,
}

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
  setCurrentTime,
  setDuration,
  setBuffered,
  setCoverScroll,
  end,
  updateCurrentIndex,
}

export default connect(mapStateToProps, mapDispathToProps)(MusicPlayer)
