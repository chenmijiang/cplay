/** @format */

import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'

import { routerSwitchVariant } from '@/variants'
import { getUserCloud, shouldUpdateCloud } from '@/store/cloud.slice'
import SongsDisplay from '@/components/SongsDisplay'
import Icon from '@/components/common/IconSvg'
import { playPause } from '@/store/play.slice'
import { showToast } from '@/store/toast.slice'
import { songUrl, uploadMusicWay } from '@/store/upload.slice'
import { clearCloudList } from '@/store/cloud.slice'

const CloudPage = () => {
  const songs = useSelector((state) => state.cloud.cloudList)
  const lastUploadTime = useSelector((state) => state.cloud.lastUploadTime)
  const dispatch = useDispatch()
  useEffect(() => {
    if (songs.length > 0) {
      // 检测是否有新的上传
      dispatch(shouldUpdateCloud())
    } else {
      dispatch(getUserCloud({ offset: 0 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (songs.length > 0 && lastUploadTime !== songs[0].addTime) {
      dispatch(getUserCloud({ offset: 0 }))
    }
  }, [dispatch, lastUploadTime, songs])
  const getAudioLink = useCallback(
    ({ id, name, artist }) => {
      const song = songs.find((song) => +song.id === +id)
      dispatch(playPause(true))
      dispatch(showToast({ message: '正在尝试获取音频...' }))
      dispatch(songUrl({ id }))
        .then((res) => {
          let { src } = res.payload
          dispatch(
            uploadMusicWay({
              id,
              src,
              name,
              artist,
              picUrl: song.pic,
              sameUrled: false
            })
          )
          dispatch(showToast({ message: '获取成功' }))
        })
        .catch(() => {
          dispatch(showToast({ message: '未知错误，获取失败' }))
        })
    },
    [dispatch, songs]
  )
  const clearCloudHandler = () => {
    dispatch(clearCloudList())
  }
  return (
    <CloudPageWrapper
      variants={routerSwitchVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="cloudPage"
    >
      {/* 介绍 */}
      <PlaylistIntroduction>
        <div className="playlist_pic">
          <Icon name="cloud" />
        </div>
        <div className="playlist_dec">
          <h3>网易云盘</h3>
          <p>只显示最新30首</p>
        </div>
        <div className="playlist_clear">
          <div className="clear_cloud" onClick={clearCloudHandler}>
            <Icon name="garbage" />
            <span>清空缓存</span>
          </div>
        </div>
      </PlaylistIntroduction>
      {/* 展示 */}
      <CloudSongDisplay>
        <SongsDisplay
          songs={songs}
          hintwords="云盘空空如也，快去收藏你喜欢的歌曲吧~"
          scrollToBottom={(callback) => {
            callback({ loading: false, isError: false })
          }}
          DoubleClick={getAudioLink}
          loadMore={false}
        />
      </CloudSongDisplay>
    </CloudPageWrapper>
  )
}

const CloudPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
`
const PlaylistIntroduction = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  color: var(--font-gray-200);
  border-bottom: 1px solid var(--bg-gray-100);
  .playlist_pic {
    height: 100px;
    width: 100px;
    padding: 15px;
    border: 2px solid var(--bg-gray-100);
    border-radius: 10px;
    margin-left: 20px;
    svg {
      width: inherit;
      height: inherit;
      fill: var(--bg-gray-100);
    }
  }
  .playlist_dec {
    flex: 1;
    height: 140px;
    h3 {
      line-height: 50px;
      font-weight: bold;
      font-size: 22px;
    }
  }
  .playlist_clear {
    align-self: end;
  }
  .clear_cloud {
    display: inline-block;
    padding: 5px 10px;
    font-size: 15px;
    background-color: var(--bg-gray-100);
    margin: 10px;
    color: var(--font-white-100);
    border-radius: 6px;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
      fill: var(--bg-white-100);
      margin-right: 3px;
    }
  }
`
const CloudSongDisplay = styled.div``

export default CloudPage
