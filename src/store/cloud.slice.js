/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserCloud as getUserCloudApi } from '@/apis'
import { showErrorToast } from '@/utils/message'

// 接口获取云盘歌曲数据
export const getUserCloud = createAsyncThunk('cloud/getCloudList', async ({ offset }) => {
  let songs = []
  try {
    let res = await getUserCloudApi({ offset })
    songs = res.data.map((song) => {
      return {
        id: song.songId,
        name: song.songName,
        artist: song.artist,
        pic: song.simpleSong.al.picUrl.replace('http://', 'https://'),
        duration: song.simpleSong.dt,
        addTime: song.addTime
      }
    })
  } catch (e) {
    showErrorToast(e)
  } finally {
    return { songs, lastUploadTime: songs[0].addTime }
  }
})

// 判断是否需要更新缓存
export const shouldUpdateCloud = createAsyncThunk('cloud/shouldUpdateCloud', async () => {
  let lastUploadTime = 0
  try {
    let res = await getUserCloudApi({ offset: 0, limit: 1 })
    lastUploadTime = res.data[0].addTime
  } catch (e) {
    showErrorToast(e)
  } finally {
    return { lastUploadTime }
  }
})

const cloudSlice = createSlice({
  name: 'cloud',
  initialState: {
    cloudList: [],
    lastUploadTime: 0
  },
  reducers: {
    setCloudList(state, action) {
      state.cloudList = action.payload
    },
    clearCloudList(state) {
      state.cloudList = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCloud.fulfilled, (state, action) => {
        state.cloudList = action.payload.songs
        state.lastUploadTime = action.payload.lastUploadTime
      })
      .addCase(shouldUpdateCloud.fulfilled, (state, action) => {
        state.lastUploadTime = action.payload.lastUploadTime
      })
  }
})

export const { setCloudList, clearCloudList } = cloudSlice.actions
export default cloudSlice.reducer
