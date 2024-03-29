/** @format */

import React, { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { routerSwitchVariant } from '@/variants'
import SongsDisplay from '@/components/SongsDisplay'
import Icon from '@/components/common/IconSvg'
import { playPause } from '@/store/play.slice'
import { restoreUploadState, songPicAndUrl, uploadLyrics } from '@/store/upload.slice'
import { initTimes } from '@/store/lyrics.slice'
import { clearAllHistory } from '@/store/history.slice'
import { useSongsDB } from '@/hooks/useSongsDB'
import { showToast } from '@/utils/message'

const HistoryPage = () => {
  const dispatch = useDispatch()
  const history = useSelector((state) => state.history.history)
  const songs = useMemo(() => {
    return history.map((song) => ({
      id: song.id,
      pic: song.picUrl,
      name: song.title,
      artist: song.artist,
      duration: song.duration || 0
    }))
  }, [history])
  // 恢复制作记录历史
  const { selectSong } = useSongsDB()
  const restoreEditHistory = useCallback(
    ({ id, name, artist }) => {
      const song = history.find((song) => song.id === id)
      dispatch(playPause(true))
      dispatch(uploadLyrics(song.lyrics))
      dispatch(initTimes(song.lytimes))
      if (Number.isInteger(+id)) {
        showToast('恢复制作记录中...')
        dispatch(songPicAndUrl({ id, name, artist, br: song.quality }))
          .then(() => {
            showToast('恢复成功')
          })
          .catch(() => {
            showToast('未知错误，获取失败')
          })
      } else {
        selectSong(id).then((item) => {
          dispatch(
            restoreUploadState({
              id,
              src: URL.createObjectURL(item.file),
              name,
              artist,
              picUrl: song.picUrl
            })
          )
        })
      }
    },
    [dispatch, history, selectSong]
  )
  // 清空历史记录
  const { clearAllSongs } = useSongsDB()
  const clearHistoryHandler = () => {
    dispatch(clearAllHistory())
    clearAllSongs()
  }
  return (
    <HistoryPageWrapper
      variants={routerSwitchVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="historyPage"
    >
      {/* 介绍 */}
      <PlaylistIntroduction>
        <div className="playlist_pic">
          <Icon name="history" />
        </div>
        <div className="playlist_dec">
          <h3>这里是你的制作记录</h3>
          <p>点按首页的复制按钮保存记录</p>
        </div>
        <div className="playlist_clear">
          <div className="clear_history" onClick={clearHistoryHandler}>
            <Icon name="garbage" />
            <span>清空记录</span>
          </div>
        </div>
      </PlaylistIntroduction>
      {/* 展示编辑记录 */}
      <HistorySongDisplay>
        <SongsDisplay
          songs={songs}
          hintwords="暂无制作记录"
          scrollToBottom={(callback) => {
            callback({ loading: false, isError: false })
          }}
          DoubleClick={restoreEditHistory}
          loadMore={false}
        />
      </HistorySongDisplay>
    </HistoryPageWrapper>
  )
}

const HistoryPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
`

const HistorySongDisplay = styled.div``

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
  .clear_history {
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

export default HistoryPage
