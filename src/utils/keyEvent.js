/**
 * setKeyEvents
 */
export const setKeyEvents = (callback) => {
  callback && (document.onkeydown = callback)
}

/**
 * clearKeyEvents
 */
export const clearKeyEvents = () => {
  document.onkeydown = null
}