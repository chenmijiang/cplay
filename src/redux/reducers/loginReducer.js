import { LOGIN_BOX, GET_QRIMG, GET_USERINFO, GET_LOGOUT } from '../enum/login'

export default function loginReducer(preState = {}, action) {
  let newState = {
    ...preState,
  }
  switch (action.type) {
    case LOGIN_BOX:
      newState.boxShowed = action.boxShowed
      return newState
    case GET_QRIMG:
      newState.key = action.key
      newState.qrimg = action.qrimg
      return newState
    case GET_USERINFO:
      newState.user = action.user
      // newState.user.userId = action.user.userId
      // newState.user.nickname = action.user.nickname
      // newState.user.avatarUrl = action.user.avatarUrl
      return newState
    case GET_LOGOUT:
      newState.user = action.user
      return newState
    default:
      return preState
  }
}
