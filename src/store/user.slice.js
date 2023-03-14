/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  onLogin as onLoginCookie,
  logout as logoutCookie,
  refreshCookie
} from '@/utils/cookie'

import {
  createQrKey as createQrKeyApi,
  createQrCode as createQrCodeApi,
  checkQrCode as checkQrCodeApi,
  getUserInfo as getUserInfoApi,
  refreshLogin as refreshLoginApi,
  logout as logoutApi
} from '@/apis'

// 请求 key 和二维码
export const createQrKey = createAsyncThunk('user/createQrKey', async () => {
  const { data } = await createQrKeyApi()
  const { data: imgData } = await createQrCodeApi({ key: data.unikey })
  return { key: data.unikey, qrimg: imgData.qrimg }
})
// 检查二维码状态
export const checkQrCode = createAsyncThunk('user/checkQrCode', async (key) => {
  const data = await checkQrCodeApi({ key })
  return data
})
// 刷新登录
export const refreshLogin = createAsyncThunk('user/refreshLogin', async () => {
  const data = await refreshLoginApi()
  return data
})
// 获取用户信息
export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await getUserInfoApi()
  let profile = data.profile
  if (profile === null) return {}
  return {
    uid: profile.userId,
    nickname: profile.nickname,
    avatarUrl: profile.avatarUrl
  }
})
// 退出登录
export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi()
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    key: '',
    qrimg: '',
    verify: {
      // 0: 等待扫码，1: 授权成功，2: 过期失效
      code: 0,
      message: ''
    },
    profile: {
      uid: '',
      nickname: '',
      avatarUrl: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQrKey.fulfilled, (state, action) => {
        const { key, qrimg } = action.payload
        state.key = key
        state.qrimg = qrimg
      })
      .addCase(checkQrCode.fulfilled, (state, action) => {
        const { code, message, cookie } = action.payload
        if (code === 801) {
          state.verify.code = 0
        } else if (code === 803) {
          onLoginCookie(cookie)
          state.verify.code = 1
        } else if (code === 800) {
          state.verify = { state: 2, message }
        }
      })
      .addCase(refreshLogin.fulfilled, (state, action) => {
        const { cookie } = action.payload
        if (cookie === undefined) {
          logoutCookie()
          state.profile = { uid: '', nickname: '', avatarUrl: '' }
        } else {
          refreshCookie(cookie)
        }
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const { uid, nickname, avatarUrl } = action.payload
        state.profile = { uid, nickname, avatarUrl }
      })
      .addCase(logout.fulfilled, (state) => {
        logoutCookie()
        state.profile = { uid: '', nickname: '', avatarUrl: '' }
      })
  }
})

// export {createQrKey } = userSlice.actions
export default userSlice.reducer
