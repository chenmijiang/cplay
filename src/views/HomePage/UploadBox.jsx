import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'

import {
  initTimes,
  updateCurrentIndex,
} from '../../redux/actions/lyricsEditActionCreator'
import {
  uploadLyrics,
  changeWay,
  uploadMusicWay2,
  uploadState,
} from '../../redux/actions/uploadActionCreator'

import { formatLyrics, getMusicInfo } from '../../utils/file_parser'
import Style from '../../assets/scss/uploadbox.module.scss'

function UploadBox(props) {
  let {
    closeUploadBox,
    /* state */
    way,
    /* dispatch */
    initTimes,
    updateCurrentIndex,
    uploadLyrics,
    changeWay,
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
  // 接口获取

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
      if (way === 1) {
      } else if (way === 2) {
        uploadMusicWay2(musicfile)
      }
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
    way,
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
              way === 1 ? Style.way_change_1 : Style.way_change_2,
            ].join(' ')}
          >
            <div className={Style.music_way}>
              <input type="text" placeholder="歌曲名" />
              <button>搜索</button>
              <p>
                搜不到歌曲？试试
                <span
                  onClick={() => {
                    changeWay(2)
                  }}
                >
                  本地上传
                </span>
              </p>
            </div>
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
              <p>
                更快获取歌曲？试试
                <span
                  onClick={() => {
                    changeWay(1)
                  }}
                >
                  在线搜索
                </span>
              </p>
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
            <label htmlFor="lyrics-file">歌词上传: 支持txt、text</label>
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

const mapStateToProps = (state) => {
  return {
    way: state.uploadFiles.way,
  }
}

const mapDispatchToProps = {
  initTimes,
  updateCurrentIndex,
  uploadLyrics,
  changeWay,
  uploadMusicWay2,
  uploadState,
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadBox)
