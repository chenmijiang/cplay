import React, { useState } from 'react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'

import lyrics from '@/store/lyrics'
import upload from '@/store/upload'

import useMusicFile from '@/hooks/useMusicFile'
import useLyricsContent from '@/hooks/useLyricsContent'

import Textarea from '@/components/common/Textarea'
import Icon from '@/components/common/IconSvg'

import { boxShowVariant } from '@/variants'
import style from './uploadfilesbox.module.scss'

const UploadBox = React.memo(
  ({
    closeUploadBox,
    initTimesDispatch,
    updateCurrentIndexDispatch,
    uploadLyricsDispatch,
    uploadMusicWay2Dispatch,
  }) => {
    // 0 : music file, 1 : lyrics file
    const [nextStep, setNextStep] = useState(0)
    // lyrics enlarge browse
    const [isEnlarged, setIsEnlarged] = useState(false)
    // animation: music is uploaded successfully
    const [[musicfile, isMusicUpload], musicChangeListener] = useMusicFile()
    const [
      [lyrics, timeShaft, isLyricsEmpty],
      lyricsContentRef,
      lyricsContentListener,
    ] = useLyricsContent()

    const handleUploadClick = () => {
      lyricsContentListener()
      if (isLyricsEmpty.current) {
        //更新音频数据
        isMusicUpload && uploadMusicWay2Dispatch(musicfile)
        //更新歌词和时间轴数据
        uploadLyricsDispatch(lyrics.current)
        initTimesDispatch(timeShaft.current)
        updateCurrentIndexDispatch(-1)
        console.log('upload successfully')
      } else {
        console.log('upload failed')
      }
    }

    const handleCloseClick = () => {
      closeUploadBox(false)
    }

    return (
      <motion.div
        className={style.upload_glass}
        transition={{ delayChildren: 0.2 }}
      >
        <motion.div
          className={style.upload_box}
          variants={boxShowVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
        >
          {/* 关闭按钮 */}
          <div
            className={style.upload_close}
            onClick={handleCloseClick}
          >
            <Icon name="close" />
          </div>
          {/* 盒子内容 */}
          <div className={style.upload_box_contain}>
            <div className={style.occupy_contain}>
              <div
                className={style.way_change_contain}
                style={{ overflow: isEnlarged ? 'visible' : 'hidden' }}
              >
                <motion.div
                  className={style.switch_block}
                  animate={{ x: nextStep === 0 ? 0 : '-50%' }}
                >
                  <div
                    className={style.upload_music_contain}
                    style={{
                      visibility: nextStep === 0 ? 'visible' : 'hidden',
                    }}
                  >
                    <div className={style.upload_file}>
                      <motion.svg
                        width="50.000000"
                        height="50.000000"
                        viewBox="0 0 50 50"
                        animate={{
                          fill: isMusicUpload
                            ? 'var(--bg-cyan-100)'
                            : 'var(--bg-gray-100)',
                        }}
                        transition={{ when: 'afterChildren' }}
                      >
                        <g clipPath="url(#clip9_4)">
                          <path
                            d="M25 48.4375C12.0562 48.4375 1.5625 37.9438 1.5625 25C1.5625 12.0562 12.0562 1.5625 25 1.5625C37.9438 1.5625 48.4375 12.0562 48.4375 25C48.4375 37.9438 37.9438 48.4375 25 48.4375L25 48.4375M25 45.3125C36.2188 45.3125 45.3125 36.2188 45.3125 25C45.3125 13.7812 36.2188 4.6875 25 4.6875C13.7812 4.6875 4.6875 13.7812 4.6875 25C4.6875 36.2188 13.7812 45.3125 25 45.3125L25 45.3125Z"
                            fillRule="nonzero"
                          />
                          <motion.path
                            d="M12.88 25.68 L21.79 34.6 L37.18 19.16"
                            strokeWidth="3"
                            animate={{ pathLength: isMusicUpload ? 1 : 0 }}
                            fill="transparent"
                            stroke="var(--bg-cyan-100)"
                            transition={{
                              type: 'tween',
                              ease: 'easeOut',
                              delay: 0.5,
                              duration: 0.5,
                            }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <motion.path
                            d="M12.5 26.5625C11.4583 26.5625 10.9375 26.0417 10.9375 25C10.9375 23.9583 11.4583 23.4375 12.5 23.4375L37.5 23.4375C38.5417 23.4375 39.0625 23.9583 39.0625 25C39.0625 26.0417 38.5417 26.5625 37.5 26.5625L12.5 26.5625Z"
                            fillRule="nonzero"
                            animate={{ opacity: isMusicUpload ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.path
                            d="M23.4375 12.5C23.4375 11.4583 23.9583 10.9375 25 10.9375C26.0417 10.9375 26.5625 11.4583 26.5625 12.5L26.5625 37.5C26.5625 38.5417 26.0417 39.0625 25 39.0625C23.9583 39.0625 23.4375 38.5417 23.4375 37.5L23.4375 12.5Z"
                            fillRule="nonzero"
                            animate={{ opacity: isMusicUpload ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip9_4">
                            <rect
                              width="50.000000"
                              height="50.000000"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </motion.svg>
                      <input
                        id="music-file"
                        type="file"
                        title="music-file"
                        accept="audio/*"
                        onChange={musicChangeListener}
                      />
                    </div>
                    <div className={style.file_des}>
                      <label htmlFor="music-file">
                        音频上传(非必须): 支持mp3、flac
                      </label>
                    </div>
                  </div>
                  <div
                    className={style.upload_lyrics_contain}
                    style={{
                      visibility: nextStep === 0 ? 'hidden' : 'visible',
                    }}
                  >
                    <motion.div
                      className={style.enlarge_contain}
                      animate={{ height: isEnlarged ? '500%' : '100%' }}
                      transition={{
                        type: 'spring',
                        duration: 0.4,
                      }}
                    >
                      {/* upload_lyrics_contain && submit */}
                      <Textarea
                        ref={lyricsContentRef}
                        scrollbarName="space_dashboard"
                        placeholder="复制歌词到这里，一句一行，分段空一行"
                      />
                      {/* enlarge */}
                      <div
                        className={style.lyrics_enlarge}
                        onClick={() => {
                          setIsEnlarged(!isEnlarged)
                        }}
                      >
                        <Icon name="enlarge" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
            {/* 切换按钮 */}
            <div className={style.upload_operation}>
              {nextStep === 0 ? (
                <div className={style.next}>
                  <button
                    onClick={() => {
                      // jump to upload lyrics
                      setNextStep(1)
                    }}
                  >
                    下一步
                  </button>
                </div>
              ) : (
                <div className={style.back}>
                  <button
                    onClick={() => {
                      // jump to upload music
                      setNextStep(0)
                    }}
                  >
                    上一步
                  </button>
                  <button onClick={handleUploadClick}>上传</button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }
)

const mapDispatchToProps = {
  initTimesDispatch: lyrics.actions.initTimes,
  updateCurrentIndexDispatch: lyrics.actions.updateCurrentIndex,
  uploadLyricsDispatch: upload.actions.uploadLyrics,
  uploadMusicWay2Dispatch: upload.actions.uploadMusicWay2,
}

export default connect(null, mapDispatchToProps)(UploadBox)
