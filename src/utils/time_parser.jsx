/**
 * 保留小数点后位数
 * @param {数字} data 数字
 * @param {位数} number 小数点后位数,默认3位
 * @returns 格式化数字,字符串
 */
function numberToFixed(data, number = 3) {
  return data.toFixed(number)
}

/**
 *
 * 秒转格式时间
 * @param { number } time 单位：秒，默认会将字符串格式转数字
 * @param { number } number 小数位数，默认3
 * @returns 格式00:00.000
 */
export function secondsToFormat(time, number = 3) {
  var minute = Math.floor(time / 60)
  var second = numberToFixed(time % 60, number)
  if (second > 59) {
    minute += 1
    second = numberToFixed(0, number)
  }
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return `${minute}:${second}`
}

/**
 * 格式时间转秒
 * @param {string} time 00:00.000
 * @returns 秒
 */
export function formatToSeconds(time) {
  let times
  times = time.split(':')
  return times[0] * 60 + times[1] * 1
}
