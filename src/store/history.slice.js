import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: 'history',
  initialState: {
    // 数据结构：{id,name,artist,pic,quality,lyrics,lytimes,duration}
    // 最多存储 30条记录
    history: []
  },
  reducers: {
    saveHistoryItem: (state, action) => {
      const song = action.payload
      state.history = clearExtraHistory(state.history)
      const index = state.history.findIndex((item) => item.id === song.id)
      if (index === -1) { state.history.push(song) } else {
        state.history[index] = song
      }
    },
    clearHistory: (state, action) => {
      const song = action.payload
      state.history = state.history.filter(item => item.id !== song.id)
    },
    clearAllHistory: (state) => {
      state.history = []
    }
  }
})

export default historySlice.reducer
export const { saveHistoryItem, clearAllHistory } = historySlice.actions

// 清理历史记录的操作
function clearExtraHistory(history) {
  const length = history.length
  if (length >= 30) {
    return ([...history]).slice(length - 29)
  }
  return history
}