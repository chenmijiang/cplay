/** @format */

import { createSlice } from '@reduxjs/toolkit'

import { setBaseUrl as setBaseUrlApi } from '@/apis'

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    quality: 128000, //音质
    baseUrl: 'https://cplay-api.vercel.app',
    animationTime: 300
  },
  reducers: {
    setMusicQuality: (state, action) => {
      state.quality = action.payload
    },
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload
      setBaseUrlApi(action.payload)
    },
    setAnimationTime: (state, action) => {
      state.animationTime = action.payload
    }
  }
})

export const { setBaseUrl, setMusicQuality, setAnimationTime } = settingSlice.actions
export default settingSlice.reducer
