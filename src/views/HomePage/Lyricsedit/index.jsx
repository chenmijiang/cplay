import React, { useState } from 'react'

import LyricsScroll from '@/components/LyricsScroll'

import { copyLyrics } from '@/utils/common'
import { animation_duration } from '@/configs/default'

import style from './lyricsedit.module.scss'

const Lyricsedit = React.memo(
  ({
    editedState,
    currentIndexState,
    lytimesState,
    nameState,
    artistState,
    lyricsState,
    uploadBoxShowDispatch,
    setEditedDispatch,
    updateCurrentIndexDispatch,
    playPauseDispatch,
  }) => {
    const handlerUploadBtn = () => {
      uploadBoxShowDispatch(true)
      playPauseDispatch(true)
    }
    const handlerEditBtn = () => {
      setEditedDispatch(true)
      updateCurrentIndexDispatch(-1)
    }
    const handlerOverviewBtn = () => {
      setEditedDispatch(false)
      updateCurrentIndexDispatch(-1)
    }
    //复制提示
    const [hinted, setHinted] = useState({
      isCopied: false,
      clearTimeId: 0,
      content: '',
    })
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
          <LyricsScroll
            lyrics={lyricsState} //歌词
            lyTimes={lytimesState} //歌词时间轴
            animate_time={animation_duration} //滚动动画时间
            currentIndex={currentIndexState} //当前歌词索引
            edited={editedState} // 编辑 || 预览 切换
          />
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
