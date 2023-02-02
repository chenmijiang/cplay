import React, { useEffect, useRef, useState } from 'react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { checkTime, animate, copyLyrics } from '@/utils/common'
import { animation_duration } from '@/configs/default'
import style from './lyricsedit.module.scss'

const Lyricsedit = React.memo(
  ({
    // pausedState,
    // currentTimeState,
    editedState,
    currentIndexState,
    lytimesState,
    nameState,
    artistState,
    lyricsState,
    uploadBoxShowDispath,
    setEditedDispath,
    updateTimeDispath,
    updateCurrentIndexDispath,
    // uploadStateDispath,
    playPauseDispath,
  }) => {
    const [lyTimes, setLyTimes] = useState(lytimesState)
    const oldLyTimes = useRef(lytimesState)
    useEffect(() => {
      if (oldLyTimes.current !== lytimesState) {
        oldLyTimes.current = lytimesState
        setLyTimes(lytimesState)
      }
    }, [lytimesState])

    const lylist = useRef()
    const [clickIndex, setClickIndex] = useState(-1) //可编辑预览模式，显示单行时间轴
    const [checked, setChecked] = useState(true) //检测时间轴格式是否正确
    const [changed, setChanged] = useState(false) //检测时间是否改变
    const handleTimeChange = (time, index) => {
      setLyTimes((pre) => {
        let lytimes = [...pre]
        lytimes[index] = time
        return lytimes
      })
      setChanged(true)
    }
    const scrollableNodeRef = useRef() //滚动事件
    //歌词滚动
    useEffect(() => {
      let el = scrollableNodeRef.current
      //获取滚动歌词到歌词栏顶端的距离
      let top = currentIndexState * 39
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
    }, [currentIndexState])
    //复制提示
    const [hinted, setHinted] = useState({
      isCopied: false,
      clearTimeId: 0,
      content: '',
    })
    const handlerUploadBtn = () => {
      uploadBoxShowDispath(true)
      playPauseDispath(true)
    }
    const handlerEditBtn = () => {
      setEditedDispath(true)
      updateCurrentIndexDispath(-1)
    }
    const handlerOverviewBtn = () => {
      setEditedDispath(false)
      updateCurrentIndexDispath(-1)
    }
    const handlerCopyBtn = () => {
      const content = copyLyrics(lytimesState, lyricsState)

      let clearTimeId = setTimeout(() => {
        setHinted((pre) => ({
          ...pre,
          isCopied: false,
          clearTimeId,
          content,
        }))
      }, 1500)
      if (clearTimeId === hinted.clearTimeId) {
        clearTimeout(hinted.clearTimeId)
      }
      setHinted({ isCopied: true, clearTimeId, content })
    }

    return (
      <div className={style.ly_contain}>
        {/* song name && singer name */}
        <div className={style.ly_header}>
          <div className={style.title}>{nameState}</div>
          <p className={style.artist}>
            歌手：<span>{artistState}</span>
          </p>
        </div>
        {/* lyrics show && edit */}
        <div className={style.show_edit_content}>
          <div className={style.ly_content}>
            <SimpleBar
              className={style.lyrics_list}
              ref={scrollableNodeRef}
            >
              <ul
                className={style.ly_ul}
                ref={lylist}
                onClick={(e) => {
                  console.log('e', e)
                  console.log(lylist)
                }}
              >
                {lyricsState.map((ly, index) => (
                  <li
                    key={index}
                    className={[
                      style.lr_li,
                      currentIndexState === index ? style.active : '',
                    ].join(' ')}
                    style={{ cursor: editedState ? 'default' : 'pointer' }}
                    onClick={() => !editedState && setClickIndex(index)}
                    onMouseLeave={() => {
                      //限流
                      if (clickIndex === index && checked && changed) {
                        setChanged(false)
                        setChecked(false)
                        // 将数据同步到状态上
                        updateTimeDispath(lyTimes[index], index)
                      }
                      if (clickIndex !== -1) {
                        setClickIndex(-1)
                      }
                    }}
                  >
                    <div
                      className={style.ly_time}
                      style={{
                        width:
                          editedState || clickIndex === index ? '24%' : '0%',
                      }}
                    >
                      [
                      <input
                        type="text"
                        value={lyTimes[index]}
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
              </ul>
            </SimpleBar>
          </div>
          {/* buttons bar */}
          <div className={style.btns_handle}>
            <div>
              <i
                className={[style.icon, style.uploading].join(' ')}
                title="上传文件"
                onClick={handlerUploadBtn}
              ></i>
            </div>
            <div>
              <i
                className={[style.icon, style.edit].join(' ')}
                title="编辑模式"
                onClick={handlerEditBtn}
              ></i>
            </div>
            <div>
              <i
                className={[style.icon, style.overview].join(' ')}
                title="可编辑预览模式"
                onClick={handlerOverviewBtn}
              ></i>
            </div>
            <div>
              <i
                className={[style.icon, style.copy].join(' ')}
                title="歌词复制"
                data-hint="复制成功"
                onClick={handlerCopyBtn}
              >
                <span
                  className={[
                    style.hint,
                    hinted.isCopied ? style.hint_active : '',
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
)

export default Lyricsedit
