import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import lyrics from '@/store/lyrics'
import player from '@/store/player'
import upload from '@/store/upload'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { checkTime, animate, copyLyrics } from '@/utils/common'
import { secondsToFormat, formatToSeconds } from '@/utils/time_parser'
import Style from './lyricsedit.module.scss'
import { animation_duration } from '@/configs/default'

/**
 * @param {*} props
 * @returns
 */
function Lyricsedit(props) {
  let {
    uploadedState,
    /* state */
    paused,
    currentTime,
    edited,
    currentIndex,
    name,
    artist,
    lyrics,
    /* dispatch */
    uploadBoxShow,
    setEdited,
    updateTime,
    updateCurrentIndex,
    uploadState,
    playPause,
  } = props

  const [info] = useState({ name, artist, lyrics }) //仅在初始化的时候更新
  const [clickIndex, setClickIndex] = useState(-1) //可编辑预览模式，显示单行时间轴
  const [times, setTimes] = useState(
    props.times.map((time) => secondsToFormat(time))
  )
  const [checked, setChecked] = useState(true) //检测时间轴格式是否正确
  const [changed, setChanged] = useState(false) //检测时间是否改变
  const [hinted, setHinted] = useState({ bool: false, id: 0, content: '' }) //复制提示

  //键盘快捷键
  useEffect(() => {
    document.onkeydown = function (evt) {
      let event = evt || window.event
      switch (event.key.toLowerCase()) {
        case ' ': // 暂停播放和开始播放
          playPause(!paused)
          break
        default:
          break
      }
      if (edited) {
        switch (event.key.toLowerCase()) {
          // 添加时间轴
          case 'enter':
            if (currentIndex < times.length - 1) {
              let index = currentIndex + 1
              updateCurrentIndex(index)
              const newTimes = [...times]
              newTimes[index] = secondsToFormat(currentTime)
              setTimes(newTimes)
              updateTime(currentTime, index)
            }
            break
          default:
            break
        }
      }
    }
    return () => {
      document.onkeydown = null
    }
  }, [
    paused,
    updateTime,
    times,
    currentIndex,
    currentTime,
    playPause,
    edited,
    updateCurrentIndex,
  ])
  const scrollableNodeRef = useRef() //滚动事件
  //歌词滚动
  useEffect(() => {
    let el = scrollableNodeRef.current
    //获取滚动歌词到歌词栏顶端的距离
    let top = currentIndex * 39
    //获取滚动可视高度
    let clientheight = el.el.clientHeight
    //需滚动的高度
    let height = top - clientheight / 2 + 100
    animate({
      duration: animation_duration, // 默认 300ms
      timing: function (timeFraction) {
        return -timeFraction * timeFraction + 2 * timeFraction
      },
      draw: function (progress) {
        el.contentWrapperEl.scroll(0, height - (1 - progress) * 39)
      },
    })
  }, [currentIndex])
  const handleTimeChange = useCallback(
    (time, index) => {
      setChanged(true)
      const newTimes = [...times]
      newTimes[index] = time
      setTimes(newTimes)
    },
    [times]
  )
  //过渡动画
  const [containActived, setContainActived] = useState(false)
  useEffect(() => {
    if (uploadedState === 2) {
      new Promise((r) => setTimeout(r, 100)).then(() => {
        setContainActived(true)
      })
    } else if (uploadedState === 1) {
      setContainActived(false)
      setTimeout(() => {
        uploadState(0)
      }, 500)
    }
  }, [uploadedState, uploadState])

  return (
    <div
      className={[
        Style.lyrics_contain,
        containActived ? Style.contain_active : '',
      ].join(' ')}
    >
      <div className={Style.hd}>
        <div className={Style.title}>{info.name}</div>
        <p className={Style.artist}>
          歌手：<span>{info.artist}</span>
        </p>
      </div>
      <div className={Style.show_content}>
        <div className={[Style.lyrics_content].join(' ')}>
          <SimpleBar
            className={Style.lyrics_list}
            ref={scrollableNodeRef}
          >
            {info.lyrics.map((ly, index) => (
              <li
                key={index}
                className={[
                  Style.lr_li,
                  currentIndex === index ? Style.active : '',
                ].join(' ')}
                style={{ cursor: edited ? 'default' : 'pointer' }}
                onClick={() => {
                  if (!edited) {
                    setClickIndex(index)
                  }
                }}
                onMouseLeave={() => {
                  //限流
                  if (clickIndex === index && checked && changed) {
                    setChanged(false)
                    setChecked(false)
                    // 将数据同步到状态上
                    updateTime(formatToSeconds(times[index]), index)
                  }
                  if (clickIndex !== -1) {
                    setClickIndex(-1)
                  }
                }}
              >
                <div
                  className={Style.ly_time}
                  style={{
                    width: edited || clickIndex === index ? '24%' : '0%',
                  }}
                >
                  [
                  <input
                    type="text"
                    value={times[index]}
                    onChange={(evt) => {
                      handleTimeChange(evt.target.value, index)
                    }}
                    onMouseLeave={(evt) => {
                      setChecked(checkTime(evt.target.value))
                      setClickIndex(index)
                    }}
                  />
                  ]
                </div>
                {ly}
              </li>
            ))}
          </SimpleBar>
        </div>
        <div className={Style.btns_handle}>
          <div>
            <i
              className={[Style.icon, Style.uploading].join(' ')}
              title="上传文件"
              onClick={() => {
                uploadBoxShow(true)
                playPause(true)
              }}
            ></i>
          </div>
          <div>
            <i
              className={[Style.icon, Style.edit].join(' ')}
              title="编辑模式"
              onClick={() => {
                setEdited(true)
                updateCurrentIndex(-1)
              }}
            ></i>
          </div>
          <div>
            <i
              className={[Style.icon, Style.overview].join(' ')}
              title="可编辑预览模式"
              onClick={() => {
                setEdited(false)
                updateCurrentIndex(-1)
              }}
            ></i>
          </div>
          <div>
            <i
              className={[Style.icon, Style.copy].join(' ')}
              title="歌词复制"
              data-hint="复制成功"
              onClick={() => {
                // console.log('我被点击了')
                const hint = copyLyrics(times, info.lyrics)

                let id = setTimeout(() => {
                  let newHinted = { ...hinted }
                  newHinted.bool = false
                  newHinted.id = id
                  newHinted.content = hint
                  setHinted(newHinted)
                }, 1500)
                if (id === hinted.id) {
                  clearTimeout(hinted.id)
                }
                setHinted({ bool: true, id, content: hint })
              }}
            >
              <span
                className={[
                  Style.hint,
                  hinted.bool ? Style.hint_active : '',
                ].join(' ')}
              >
                {hinted.content}
              </span>
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    paused: state.player.paused,
    currentTime: state.player.currentTime,
    edited: state.lyricsEdit.edited,
    times: state.lyricsEdit.times,
    currentIndex: state.lyricsEdit.currentIndex,
    name: state.uploadFiles.name,
    artist: state.uploadFiles.artist,
    lyrics: state.uploadFiles.lyrics,
  }
}

const mapDispathToProps = {
  uploadBoxShow: lyrics.actions.uploadBoxShow,
  setEdited: lyrics.actions.setEdited,
  updateTime: lyrics.actions.updateTime,
  updateCurrentIndex: lyrics.actions.updateCurrentIndex,
  uploadState: upload.actions.uploadState,
  playPause: player.actions.playPause,
}

export default connect(mapStateToProps, mapDispathToProps)(Lyricsedit)
