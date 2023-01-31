import {
  EDITED,
  UPLOAD,
  UPDATE_TIMES,
  CHANGE_CURRENT_INDEX,
  INIT_TIMES,
} from './type'

export function setEdited(bool) {
  return {
    type: EDITED,
    edited: bool,
  }
}

export function uploadBoxShow(bool) {
  return {
    type: UPLOAD,
    uploaded: bool,
  }
}

export function updateTime(time, index) {
  return {
    type: UPDATE_TIMES,
    time,
    index,
  }
}

export function initTimes(times) {
  return {
    type: INIT_TIMES,
    times,
  }
}

export function updateCurrentIndex(index) {
  return {
    type: CHANGE_CURRENT_INDEX,
    currentIndex: index,
  }
}
