import {
  PLAY_PAUSE,
  CHANGE_SRC,
  LOAD,
  BUFFERED,
  DURATION,
  CURRENTTIME,
  VOLUME,
  ERROR,
  END,
  JUMP_TO_TARGET_TIME,
  COVER_SCROLL,
} from './type'

export function setCoverScroll(bool) {
  return {
    type: COVER_SCROLL,
    scrolled: bool,
  }
}

export function setTargetTime(time) {
  return {
    type: JUMP_TO_TARGET_TIME,
    targetTime: time,
  }
}

export function end() {
  return {
    type: END,
    paused: true,
  }
}

export function error() {
  return {
    type: ERROR,
  }
}

export function changeSrc(src) {
  return {
    type: CHANGE_SRC,
    src: src,
  }
}

export function setBuffered(buf) {
  return {
    type: BUFFERED,
    buffered: buf,
  }
}

export function load() {
  return {
    type: LOAD,
  }
}

export function setVolume(vol) {
  return {
    type: VOLUME,
    volume: vol,
  }
}

export function setDuration(time) {
  return {
    type: DURATION,
    duration: time,
  }
}

export function setCurrentTime(time) {
  return {
    type: CURRENTTIME,
    currentTime: time,
  }
}

export function playPause(bool) {
  return {
    type: PLAY_PAUSE,
    paused: bool,
  }
}
