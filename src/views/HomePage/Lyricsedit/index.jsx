import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import LyricsScroll from '@/components/LyricsScroll'

import { copyLyrics } from '@/utils/common'

import style from './lyricsedit.module.scss'
import {
  setEdited,
  updateCurrentIndex,
  uploadBoxShow,
} from '@/store/lyrics.slice'
import { playPause } from '@/store/play.slice'
import { saveHistoryItem } from '@/store/history.slice'
import { btnTapSpringVariant } from '@/variants'

const Lyricsedit = React.memo(() => {
  const dispatch = useDispatch()
  const {
    edited,
    animationTime,
    lytimes,
    artist,
    title,
    currentIndex,
    lyrics,
    id,
    quality,
    picUrl,
    duration,
  } = useSelector((state) => ({
    edited: state.lyricsEdit.edited,
    lytimes: state.lyricsEdit.times,
    animationTime: state.setting.animationTime,
    artist: state.uploadFiles.artist,
    title: state.uploadFiles.name,
    id: state.uploadFiles.id,
    lyrics: state.uploadFiles.lyrics,
    currentIndex: state.lyricsEdit.currentIndex,
    quality: state.setting.quality,
    picUrl: state.uploadFiles.picUrl,
    duration: state.player.duration,
  }))

  const handlerUploadBtn = () => {
    dispatch(uploadBoxShow(true))
    dispatch(playPause(true))
  }
  const handlerEditBtn = () => {
    dispatch(setEdited(true))
    dispatch(updateCurrentIndex(-1))
  }
  const handlerOverviewBtn = () => {
    dispatch(setEdited(false))
    dispatch(updateCurrentIndex(-1))
  }
  //复制提示
  const [hinted, setHinted] = useState({
    isCopied: false,
    clearTimeId: 0,
    content: '',
  })
  const handlerCopyBtn = () => {
    const content = copyLyrics(lytimes, lyrics)

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
    // 保存到历史记录,限制仅搜索歌曲时才保存
    if (id !== 0) {
      dispatch(
        saveHistoryItem({
          id,
          quality,
          lyrics,
          lytimes,
          title,
          artist,
          picUrl,
          duration: duration * 1000,
        })
      )
    }
    setHinted({ isCopied: true, clearTimeId, content })
  }

  return (
    <div className={style.ly_contain}>
      {/* song name && singer name */}
      <div className={style.ly_header}>
        <div className={style.title}>{title}</div>
        <p className={style.artist}>
          歌手：<span>{artist}</span>
        </p>
      </div>
      {/* lyrics show && edit */}
      <div className={style.show_edit_content}>
        <LyricsScroll
          lyrics={lyrics} //歌词
          lyTimes={lytimes} //歌词时间轴
          animate_time={animationTime} //滚动动画时间
          currentIndex={currentIndex} //当前歌词索引
          edited={edited} // 编辑 || 预览 切换
        />
        {/* buttons bar */}
        <div className={style.btns_handle}>
          <motion.div whileTap="tap" variants={btnTapSpringVariant}>
            <i
              className={[style.icon, style.uploading].join(' ')}
              title="上传文件"
              onClick={handlerUploadBtn}
            ></i>
          </motion.div>
          <motion.div whileTap="tap" variants={btnTapSpringVariant}>
            <i
              className={[style.icon, style.edit].join(' ')}
              title="编辑模式"
              onClick={handlerEditBtn}
            ></i>
          </motion.div>
          <motion.div whileTap="tap" variants={btnTapSpringVariant}>
            <i
              className={[style.icon, style.overview].join(' ')}
              title="可编辑预览模式"
              onClick={handlerOverviewBtn}
            ></i>
          </motion.div>
          <motion.div whileTap="tap" variants={btnTapSpringVariant}>
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
          </motion.div>
        </div>
      </div>
    </div>
  )
})

export default Lyricsedit
