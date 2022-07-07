/**
 * 音频处理事件
 */

const loadedData = (e, callback) => {
  console.log('音频的第一帧加载完成 - onLoadedData', e)
  callback &&
    callback({
      e,
    })
}

const progress = (e, callback) => {
  // console.log("音频正在加载 - progress");
  callback &&
    callback({
      e,
    })
}

const timeUpdate = (e, callback) => {
  // console.log("当前的时间：", evt.target.currentTime);
  let myAudio = e.target
  let value = 0
  //获取 加载进度
  let duration = myAudio.duration
  if (duration > 0) {
    for (let i = 0; i < myAudio.buffered.length; i++) {
      let index = myAudio.buffered.length - 1 - i
      if (myAudio.buffered.start(index) < myAudio.currentTime) {
        // 小数数据
        value = myAudio.buffered.end(index) / duration
        break
      }
    }
  }
  callback &&
    callback({
      e,
      value,
    })
}

const ended = (e, callback) => {
  console.log('播放结束')
  callback &&
    callback({
      e,
    })
}

const error = (e, callback) => {
  console.log(
    '浏览器尝试获取音频，但是音频不可用时触发 - error',
    e.target.error
  )
  callback &&
    callback({
      e,
    })
}

const suspend = (e, callback) => {
  console.log('音频加载暂停时触发 - suspend')
  callback &&
    callback({
      e,
    })
}

const waiting = (e, callback) => {
  console.log('开始播放前缓冲下一帧时触发 waiting')
  callback &&
    callback({
      e,
    })
}

const canplay = (e, callback) => {
  console.log('浏览器能够开始播放音频时触发 canplay')
  callback &&
    callback({
      e,
    })
}

const canPlayThrough = (e, callback) => {
  console.log(
    '浏览器预计在不停下来进行缓冲的情况下，能够持续播放指定的音频时会触发 canPlayThrough'
  )
  callback &&
    callback({
      e,
    })
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  loadedData,
  progress,
  timeUpdate,
  ended,
  error,
  suspend,
  waiting,
  canplay,
  canPlayThrough,
}
