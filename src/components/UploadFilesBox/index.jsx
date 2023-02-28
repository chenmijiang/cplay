import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import useMusicFile from '@/hooks/useMusicFile'
import useLyricsContent from '@/hooks/useLyricsContent'

import { boxShowVariant } from '@/variants'
import style from './uploadfilesbox.module.scss'
import { uploadLyrics, uploadMusicWay } from '@/store/upload.slice'
import { initTimes, updateCurrentIndex } from '@/store/lyrics.slice'
import Textarea from '@/components/common/Textarea'

const UploadBox = React.memo(({ closeUploadBox }) => {
  const dispatch = useDispatch()
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
      isMusicUpload && dispatch(uploadMusicWay(musicfile))
      //更新歌词和时间轴数据
      dispatch(uploadLyrics(lyrics.current))
      dispatch(initTimes(timeShaft.current))
      dispatch(updateCurrentIndex(-1))
      console.log('上传成功')
    } else {
      console.log('上传失败')
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
        <div className={style.upload_close} onClick={handleCloseClick}>
          <svg
            width="30.000000"
            height="30.000000"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g clipPath="url(#clip9_8)">
              <path
                d="M15 3.75C8.8125 3.75 3.75 8.8125 3.75 15C3.75 21.1875 8.8125 26.25 15 26.25C21.1875 26.25 26.25 21.1875 26.25 15C26.25 8.8125 21.1875 3.75 15 3.75L15 3.75M15 24.375C9.75 24.375 5.625 20.25 5.625 15C5.625 9.75 9.75 5.625 15 5.625C20.25 5.625 24.375 9.75 24.375 15C24.375 20.25 20.25 24.375 15 24.375L15 24.375M19.6875 10.3125C19.3125 9.9375 18.75 9.9375 18.375 10.3125L15 13.6875L11.625 10.3125C11.25 9.9375 10.6875 9.9375 10.3125 10.3125C9.9375 10.6875 9.9375 11.25 10.3125 11.625L13.6875 15L10.3125 18.375C9.9375 18.75 9.9375 19.3125 10.3125 19.6875C10.6875 20.0625 11.25 20.0625 11.625 19.6875L15 16.3125L18.375 19.6875C18.75 20.0625 19.3125 20.0625 19.6875 19.6875C20.0625 19.3125 20.0625 18.75 19.6875 18.375L16.3125 15L19.6875 11.625C20.0625 11.25 20.0625 10.6875 19.6875 10.3125L19.6875 10.3125Z"
                fillRule="evenodd"
              />
            </g>
            <defs>
              <clipPath id="clip9_8">
                <rect width="30.000000" height="30.000000" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
                      placeholder="复制歌词到这里，一句一行，分段空一行"
                      scrollbarName="space_dashboard"
                    />
                    {/* <textarea
                      ref={lyricsContentRef}
                      placeholder="复制歌词到这里，一句一行，分段空一行"
                    /> */}
                    {/* enlarge */}
                    <div
                      className={style.lyrics_enlarge}
                      onClick={() => {
                        setIsEnlarged(!isEnlarged)
                      }}
                    >
                      <motion.svg
                        width="14.000000"
                        height="14.000000"
                        viewBox="0 0 14 14"
                        fill="none"
                        whileHover={{
                          scale: 1.2,
                        }}
                        transition={{ durations: 0.4 }}
                      >
                        <g clipPath="url(#clip15_4)">
                          <path
                            d="M13.3636 1.11364L13.3636 4.34191C13.3636 4.6601 13.2045 4.81918 12.8864 4.81918C12.5682 4.81918 12.4091 4.6601 12.4091 4.34191L12.4091 2.26546L8.71942 5.95509C8.49457 6.18087 8.26978 6.18087 8.04492 5.95509C7.8197 5.73003 7.8197 5.50497 8.04492 5.27991L11.7339 1.59091L9.65808 1.59091C9.3399 1.5907 9.18091 1.4315 9.18115 1.11332C9.18134 0.795143 9.34052 0.636154 9.65869 0.636368L12.8864 0.636368C13.2045 0.636368 13.3636 0.795456 13.3636 1.11364ZM5.28119 8.04428L1.59088 11.7339L1.59088 9.65682C1.5907 9.33864 1.43152 9.17966 1.11328 9.17987C0.795105 9.18008 0.636169 9.33928 0.636353 9.65746L0.636353 12.8864C0.636353 13.2046 0.795471 13.3636 1.11365 13.3636L4.34253 13.3636C4.66071 13.3636 4.81982 13.2046 4.81982 12.8864C4.81982 12.5682 4.66071 12.4091 4.34253 12.4091L2.26605 12.4091L5.95636 8.71883C6.18915 8.4938 6.19098 8.26687 5.96198 8.03804C5.73291 7.80922 5.50598 7.81129 5.28119 8.04428ZM2.26605 1.59091L4.3432 1.59091C4.66144 1.59081 4.8205 1.43162 4.82031 1.11332C4.82007 0.795029 4.66083 0.636047 4.34253 0.636368L1.11365 0.636368C0.795471 0.636368 0.636353 0.795456 0.636353 1.11364L0.636353 4.34191C0.636475 4.65999 0.795532 4.81902 1.11365 4.81902C1.4317 4.81902 1.59076 4.65999 1.59088 4.34191L1.59088 2.26546L5.28119 5.95509C5.50604 6.18087 5.7309 6.18087 5.95569 5.95509C6.18091 5.73003 6.18091 5.50497 5.95569 5.27991L2.26605 1.59091ZM12.8864 9.18018C12.5682 9.18018 12.4091 9.33928 12.4091 9.65746L12.4091 11.7346L8.71942 8.04428C8.49438 7.81887 8.26923 7.81878 8.04401 8.04401C7.81879 8.26925 7.81885 8.4944 8.04425 8.71946L11.7339 12.4097L9.65808 12.4097C9.32825 12.3979 9.16351 12.557 9.1637 12.887C9.16394 13.217 9.32892 13.3759 9.65869 13.3636L12.8864 13.3636C13.2045 13.3636 13.3636 13.2046 13.3636 12.8864L13.3636 9.65746C13.3636 9.33928 13.2045 9.18018 12.8864 9.18018Z"
                            fillRule="nonzero"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip15_4">
                            <rect
                              width="13.999999"
                              height="14.000000"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </motion.svg>
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
})

export default UploadBox
