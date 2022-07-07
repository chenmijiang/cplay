import { LOGIN_BOX, GET_QRIMG, GET_USERINFO, GET_LOGOUT } from '../enum/login'
import { HttpManager } from '../../HttpManager'

export function showLoginBox(bool) {
  return {
    type: LOGIN_BOX,
    boxShowed: bool,
  }
}

export async function getQrimg() {
  const ret = await HttpManager.GetQrimg()
  return {
    type: GET_QRIMG,
    key: ret.key,
    qrimg: ret.qrimg,
  }
}

export async function getUserInfo() {
  const user = await HttpManager.GetUserInfo()
  return {
    type: GET_USERINFO,
    user: user.userinfo,
  }
}

export async function logout() {
  HttpManager.Logout()
  return {
    type: GET_LOGOUT,
    user: {},
  }
}
