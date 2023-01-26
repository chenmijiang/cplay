// 播放器
const player = {
  paused: true, //暂停播放
  buffered: 0, //缓存进度
  volume: 1, //音量
  duration: 830, //时长
  currentTime: 0, //现时间
  targetTime: 0, //目标时间，用于拖拽后替换的时间
  scrolled: true, //唱片是否滚动
}

export default player