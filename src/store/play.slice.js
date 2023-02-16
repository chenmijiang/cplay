import { createSlice } from "@reduxjs/toolkit";

const playSlice = createSlice({
  name: 'play',
  initialState: {
    paused: true, //暂停播放
    buffered: 0, //缓存进度
    volume: 1, //音量
    duration: 830, //时长
    currentTime: 0, //现时间
    targetTime: 0, //目标时间，用于拖拽后替换的时间
    scrolled: true, //唱片是否滚动
  },
  reducers: {
    playPause: (state, action) => {
      state.paused = action.payload
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action) => {
      state.duration = action.payload
    },
    setVolume: (state, action) => {
      state.volume = action.payload
    },
    setBuffered: (state, action) => {
      state.buffered = action.payload
    },
    setTargetTime: (state, action) => {
      state.targetTime = action.payload
    },
    setCoverScroll: (state, action) => {
      state.scrolled = action.payload
    }
  }
})

export const {
  playPause,
  setCurrentTime,
  setDuration,
  setVolume,
  setBuffered,
  setTargetTime,
  setCoverScroll
} = playSlice.actions
export default playSlice.reducer