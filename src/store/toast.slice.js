import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: '',
    duration: 0,
  },
  reducers: {
    showToast: (state, action) => {
      let { message, duration } = action.payload
      state.message = message
      state.duration = duration || 3000
    },
    dismissToast: (state) => {
      state.message = ''
      state.duration = 0
    },
  },
});

export const { showToast, dismissToast } = toastSlice.actions
export default toastSlice.reducer
