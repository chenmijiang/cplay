import request from './request'

// 扫码登录

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