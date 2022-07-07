import { get } from './request'

const HttpManager = {
  /* 登录相关接口 */
  GetQrimg: () => get(`/login/qr`),
  CheckQrimg: (key) => get(`/login/qr/check`, { params: { key } }),
  GetUserInfo: () => get(`/login/userinfo`),
  Logout: () => get('/login/exit'),
}

export { HttpManager }
