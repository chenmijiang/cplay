import { CLEAR_HISTORY } from './type'

// 清除历史记录
export const clearHistory = () => {
  return {
    type: CLEAR_HISTORY,
  }
}