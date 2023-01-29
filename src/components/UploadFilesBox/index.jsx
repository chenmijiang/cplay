import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'

import lyrics from '@/store/lyrics'
import upload from '@/store/upload'

import { formatLyrics, getMusicInfo } from '@/utils/file_parser'
import style from './uploadfilesbox.module.scss'

function UploadBox(props) {
  let {
    closeUploadBox,
    /* dispatch */
    initTimes,
    updateCurrentIndex,
    uploadLyrics,
    uploadMusicWay2,
    uploadState,
  } = props
  const [musicfile, setMusicfile] = useState({})
  const [lyrics, setLyrics] = useState([])
  const [times, setTimes] = useState([])
  const [uploadMusiced, setUploadMusiced] = useState(false)
  const [uploadLyricsed, setUploadLyricsed] = useState(false)
  const checkFile = useCallback((el, type) => {
    let file = el.files[0]
    return file && file.type.includes(type)
      ? {
          bool: true,
          data: file,
        }
      : {
          bool: false,
          data: '文件格式错误或空文件',
        }
  }, [])

  // 本地获取音频
  const handleMusicFileChange = useCallback(
    (el) => {
      let result = checkFile(el, 'audio')
      if (result.bool) {
        getMusicInfo(result.data).then((obj) => {
          let data = obj.data
          // 音频链接
          let src = URL.createObjectURL(result.data)
          data.src = src
          data.sameUrled = false
          setMusicfile(data)
        })
      }
      setUploadMusiced(result.bool)
    },
    [checkFile]
  )
  const handleLyricsFileChange = useCallback(
    (el) => {
      let result = checkFile(el, 'text')
      if (result.bool) {
        formatLyrics(result.data).then((ly) => {
          const ti = [...Array.from({ length: ly.length })].map((_) => 0)
          setLyrics(ly)
          setTimes(ti)
        })
      }
      setUploadLyricsed(result.bool)
    },
    [checkFile, setLyrics, setTimes, setUploadLyricsed]
  )

  const handleUploadClick = useCallback(() => {
    if (uploadMusiced && uploadLyricsed) {
      //更新音频数据
      uploadMusicWay2(musicfile)

      //更新歌词和时间轴数据
      uploadLyrics(lyrics)
      uploadState(1)
      setTimeout(() => {
        uploadState(2)
      }, 1000)
      updateCurrentIndex(-1)
      initTimes(times)
    }
  }, [
    uploadLyrics,
    uploadMusicWay2,
    initTimes,
    lyrics,
    times,
    uploadMusiced,
    uploadLyricsed,
    musicfile,
    updateCurrentIndex,
    uploadState,
  ])

  const handleCloseClick = useCallback(() => {
    //清空数据
    setLyrics([])
    setTimes([])
    setUploadMusiced(false)
    setUploadLyricsed(false)
    closeUploadBox(false)
    //更新歌词编辑区的数据
  }, [closeUploadBox])

  return (
    <motion.div
      className={style.upload_glass}
      transition={{ delayChildren: 0.2 }}
    >
      <motion.div
        className={style.upload_box}
        initial={{ x: '-50%', y: 0, opacity: 0 }}
        animate={{ x: '-50%', y: '20vh', opacity: 1 }}
        exit={{ x: '-50%', y: '5vh', opacity: 0 }}
        transition={{
          ease: 'easeInOut',
        }}
      >
        {/* 关闭按钮 */}
        <div
          className={style.upload_close}
          onClick={() => {
            handleCloseClick()
          }}
        >
          <svg
            width="30.000000"
            height="30.000000"
            viewBox="0 0 30 30"
            fill="none"
          >
            <g clip-path="url(#clip9_8)">
              <path
                d="M15 3.75C8.8125 3.75 3.75 8.8125 3.75 15C3.75 21.1875 8.8125 26.25 15 26.25C21.1875 26.25 26.25 21.1875 26.25 15C26.25 8.8125 21.1875 3.75 15 3.75L15 3.75M15 24.375C9.75 24.375 5.625 20.25 5.625 15C5.625 9.75 9.75 5.625 15 5.625C20.25 5.625 24.375 9.75 24.375 15C24.375 20.25 20.25 24.375 15 24.375L15 24.375M19.6875 10.3125C19.3125 9.9375 18.75 9.9375 18.375 10.3125L15 13.6875L11.625 10.3125C11.25 9.9375 10.6875 9.9375 10.3125 10.3125C9.9375 10.6875 9.9375 11.25 10.3125 11.625L13.6875 15L10.3125 18.375C9.9375 18.75 9.9375 19.3125 10.3125 19.6875C10.6875 20.0625 11.25 20.0625 11.625 19.6875L15 16.3125L18.375 19.6875C18.75 20.0625 19.3125 20.0625 19.6875 19.6875C20.0625 19.3125 20.0625 18.75 19.6875 18.375L16.3125 15L19.6875 11.625C20.0625 11.25 20.0625 10.6875 19.6875 10.3125L19.6875 10.3125Z"
                fill-rule="evenodd"
                fill="#BCBCBC"
              />
            </g>
            <defs>
              <clipPath id="clip9_8">
                <rect
                  width="30.000000"
                  height="30.000000"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={style.upload_box_contain}>
          {/*  */}
          <div className={style.upload_music_contain}>
            <div className={style.music_way}>
              <div className={style.upload_file}>
                <svg
                  width="50.000000"
                  height="50.000000"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <g clip-path="url(#clip9_4)">
                    <path
                      d="M25 48.4375C12.0562 48.4375 1.5625 37.9438 1.5625 25C1.5625 12.0562 12.0562 1.5625 25 1.5625C37.9438 1.5625 48.4375 12.0562 48.4375 25C48.4375 37.9438 37.9438 48.4375 25 48.4375L25 48.4375M25 45.3125C36.2188 45.3125 45.3125 36.2188 45.3125 25C45.3125 13.7812 36.2188 4.6875 25 4.6875C13.7812 4.6875 4.6875 13.7812 4.6875 25C4.6875 36.2188 13.7812 45.3125 25 45.3125L25 45.3125Z"
                      fill-rule="nonzero"
                      fill="#BCBCBC"
                    />
                    <path
                      d="M12.5 26.5625C11.4583 26.5625 10.9375 26.0417 10.9375 25C10.9375 23.9583 11.4583 23.4375 12.5 23.4375L37.5 23.4375C38.5417 23.4375 39.0625 23.9583 39.0625 25C39.0625 26.0417 38.5417 26.5625 37.5 26.5625L12.5 26.5625Z"
                      fill-rule="nonzero"
                      fill="#BCBCBC"
                    />
                    <path
                      d="M23.4375 12.5C23.4375 11.4583 23.9583 10.9375 25 10.9375C26.0417 10.9375 26.5625 11.4583 26.5625 12.5L26.5625 37.5C26.5625 38.5417 26.0417 39.0625 25 39.0625C23.9583 39.0625 23.4375 38.5417 23.4375 37.5L23.4375 12.5Z"
                      fill-rule="nonzero"
                      fill="#BCBCBC"
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
                </svg>

                <input
                  id="music-file"
                  type="file"
                  title="music-file"
                  accept="audio/*"
                  onChange={(evt) => {
                    handleMusicFileChange(evt.target)
                  }}
                />
              </div>
              <div className={style.file_des}>
                <label htmlFor="music-file">音频上传: 支持mp3、flac</label>
              </div>
            </div>
            <button
              className={style.upload_button}
              onClick={() => {
                // jump to upload lyrics
              }}
            >
              下一步
            </button>
          </div>
          <div className={style.upload_lyrics_contain}>
            {/* upload_lyrics_contain && submit */}
          </div>
        </div>
      </motion.div>
    </motion.div>
    // <div className={style.upload_box}>
    //   <div
    //     className={style.upload_close}
    //     onClick={() => {
    //       handleCloseClick()
    //     }}
    //   ></div>
    //   <div className={style.upload_box_contain}>
    //     <div className={style.way_change_contain}>
    //       <div className={[style.file, style.music].join(' ')}>
    //         <div className={style.music_way}>
    //           <div className={style.upload_file}>
    //             <i
    //               className={[
    //                 style.upload_icon,
    //                 uploadMusiced ? style.upload_success : '',
    //               ].join(' ')}
    //             ></i>
    //             <input
    //               id="music-file"
    //               type="file"
    //               title="music-file"
    //               accept="audio/*"
    //               onChange={(evt) => {
    //                 handleMusicFileChange(evt.target)
    //               }}
    //             />
    //           </div>
    //           <div className={style.file_des}>
    //             <label htmlFor="music-file">音频上传: 支持mp3、wav、flac</label>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={[style.file, style.lyrics].join(' ')}>
    //       <div className={style.upload_file}>
    //         <i
    //           className={[
    //             style.upload_icon,
    //             uploadLyricsed ? style.upload_success : '',
    //           ].join(' ')}
    //         ></i>
    //         <input
    //           id="lyrics-file"
    //           type="file"
    //           title="lyrics file"
    //           accept="text/*"
    //           onChange={(evt) => {
    //             handleLyricsFileChange(evt.target)
    //           }}
    //         />
    //       </div>
    //       <div className={style.file_des}>
    //         <label htmlFor="lyrics-file">歌词上传(utf8): 支持txt、text</label>
    //         <p>歌词每句一行，分段空一行</p>
    //       </div>
    //     </div>
    //     <button
    //       className={style.upload_button}
    //       onClick={() => {
    //         handleUploadClick()
    //       }}
    //     >
    //       上传
    //     </button>
    //   </div>
    // </div>
  )
}

const mapDispatchToProps = {
  initTimes: lyrics.actions.initTimes,
  updateCurrentIndex: lyrics.actions.updateCurrentIndex,
  uploadLyrics: upload.actions.uploadLyrics,
  uploadMusicWay2: upload.actions.uploadMusicWay2,
  uploadState: upload.actions.uploadState,
}

export default connect(null, mapDispatchToProps)(UploadBox)
