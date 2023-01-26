import {
  PLAY_PAUSE,
  CURRENTTIME,
  DURATION,
  VOLUME,
  BUFFERED,
  END,
  JUMP_TO_TARGET_TIME,
  COVER_SCROLL,
} from './type'

export default function playerReducer(preState = {}, action) {
  let newState = {
    ...preState,
  }
  switch (action.type) {
    case PLAY_PAUSE:
      newState.paused = action.paused
      return newState
    case CURRENTTIME:
      newState.currentTime = action.currentTime
      return newState
    case DURATION:
      newState.duration = action.duration
      return newState
    case VOLUME:
      newState.volume = action.volume
      return newState
    case BUFFERED:
      newState.buffered = action.buffered
      return newState
    case END:
      newState.paused = action.paused
      return newState
    case JUMP_TO_TARGET_TIME:
      newState.targetTime = action.targetTime
      return newState
    case COVER_SCROLL:
      newState.scrolled = action.scrolled
      return newState
    default:
      return preState
  }
}
