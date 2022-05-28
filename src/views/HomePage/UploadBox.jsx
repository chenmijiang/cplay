import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'

import {
  initTimes,
  updateCurrentIndex,
} from '../../redux/actions/lyricsEditActionCreator'
import {
  uploadLyrics,
  uploadMusicWay2,
  uploadState,
} from '../../redux/actions/uploadActionCreator'

import { formatLyrics, getMusicInfo } from '../../utils/file_parser'
import Style from '../../assets/scss/uploadbox.module.scss'

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
    <div className={Style.upload_box}>
      <div
        className={Style.upload_close}
        onClick={() => {
          handleCloseClick()
        }}
      ></div>
      <div className={Style.upload_box_contain}>
        <div className={Style.way_change_contain}>
          <div
            className={[
              Style.file,
              Style.music,
            ].join(' ')}
          >
            <div className={Style.music_way}>
              <div className={Style.upload_file}>
                <i
                  className={[
                    Style.upload_icon,
                    uploadMusiced ? Style.upload_success : '',
                  ].join(' ')}
                ></i>
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
              <div className={Style.file_des}>
                <label htmlFor="music-file">音频上传: 支持mp3、wav、flac</label>
              </div>
            </div>
          </div>
        </div>
        <div className={[Style.file, Style.lyrics].join(' ')}>
          <div className={Style.upload_file}>
            <i
              className={[
                Style.upload_icon,
                uploadLyricsed ? Style.upload_success : '',
              ].join(' ')}
            ></i>
            <input
              id="lyrics-file"
              type="file"
              title="lyrics file"
              accept="text/*"
              onChange={(evt) => {
                handleLyricsFileChange(evt.target)
              }}
            />
          </div>
          <div className={Style.file_des}>
            <label htmlFor="lyrics-file">歌词上传(utf8): 支持txt、text</label>
            <p>歌词每句一行，分段空一行</p>
          </div>
        </div>
        <button
          className={Style.upload_button}
          onClick={() => {
            handleUploadClick()
          }}
        >
          上传
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  initTimes,
  updateCurrentIndex,
  uploadLyrics,
  uploadMusicWay2,
  uploadState,
}

export default connect(null, mapDispatchToProps)(UploadBox)
