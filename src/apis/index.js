import request from './request'

/**
 * 1. 登录
 */
// 生成 key
export const createQrKey = () =>
  request('get', '/login/qr/key')
// 生成二维码
export const createQrCode = ({ key }) =>
  request('get', '/login/qr/create', null, { key, qrimg: 1 })
// 检查二维码状态
export const checkQrCode = ({ key }) =>
  request('get', '/login/qr/check', null, { key, _: Date.now() })
// 获取用户信息
export const getUserInfo = () => 
  request('get', '/login/status')
// 退出登录
export const logout = () =>
  request('get', '/logout')

/**
 * 2. 搜索
 */
// 搜索歌曲
export const search = ({ keywords, type, limit, offset }) =>
  request('get', '/search', null, { keywords, type, limit, offset })
// 歌曲封面
export const songPic = ({ ids }) =>
  request('get', '/song/detail', null, { ids })
// 歌曲是否可用
export const songCheck = ({ id, br }) =>
  request('get', '/check/music', null, { id, br })
// 歌曲播放地址
export const songUrl = ({ id, br }) =>
  request('get', '/song/url', null, { id, br })
// 搜索热词
export const searchHot = () =>
  request('get', '/search/hot')


// 历史记录(歌单管理)

// 云盘上传