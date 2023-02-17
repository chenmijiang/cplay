/**
 * 设置当前索引
 * @param {number} currentime
 * @param {Array<number>} times
 * @returns
 */
export function setCurrentIndex(currentime, times) {
  if (currentime < times[0]) {
    //不存在-1项，只是为了解决第0行高亮问题
    return -1
  }
  for (let i = 0; i < times.length; i++) {
    if (i === times.length - 1) {
      return i
    }
    if (times[i] <= currentime && currentime <= times[i + 1]) {
      return i
    }
  }
}

/**
 * 检查时间格式
 * @param {string} time
 * @returns
 */
export function checkTime(time) {
  if (/^[0-9]{2}:[0-9]{2}\.[0-9]{3}$/.test(time)) {
    return true
  } else {
    alert('时间轴格式不对，请修改后保存')
    return false
  }
}

/** 动画效果 */
export function animate({ timing, draw, duration }) {
  let start = performance.now()
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    // 计算当前动画状态
    let progress = timing(timeFraction)
    draw(progress) // 执行动画
    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}

/**
 * 歌词复制
 * @param {string[]} times
 * @param {string[]} lyrics
 * @returns
 */
export function copyLyrics(times, lyrics) {
  let msg
  if (navigator.clipboard.writeText) {
    let copyContent = lyrics
      .map((ly, index) => `[${times[index]}]${ly}`)
      .join('\n')
    navigator.clipboard.writeText(copyContent)
    msg = '复制成功'
  } else {
    msg = oldCopyLyrics(times, lyrics)
  }
  return msg
}

export function oldCopyLyrics(times, lyrics) {
  if (typeof document.execCommand !== 'function') {
    return '复制失败'
  }

  let copyContent = lyrics
    .map((ly, index) => `[${times[index]}]${ly}`)
    .join('\n')

  let dom = document.createElement('textarea')
  dom.value = copyContent
  dom.setAttribute('style', 'display: block;width: 1px;height: 1px;')
  document.body.appendChild(dom)
  dom.select()
  let result = document.execCommand('copy')
  document.body.removeChild(dom)
  if (result) {
    return '复制成功'
  }

  if (typeof document.createRange !== 'function') {
    return '复制失败'
  }

  let range = document.createRange()
  let div = document.createElement('div')
  div.innerHTML = copyContent
  div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;')
  document.body.appendChild(div)
  range.selectNode(div)
  let selection = window.getSelection()
  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }
  selection.addRange(range)
  document.execCommand('copy')
  return '复制成功'
}
