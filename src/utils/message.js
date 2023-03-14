/** @format */

import { store } from '@/store'
import { showToast as showToastSlice } from '@/store/toast.slice'

export function showToast(message) {
  store.dispatch(showToastSlice({ message }))
}

const requestMsg = {
  fail: '请求异常😮，可以多试几次，若还是不行就换一首吧。。。',
  unachievable: '哦No😱...接口无法访问了！',
  timeout: '请求超时，更换网络或自建接口',
  notConnectNetwork: '无法连接到服务器',
  cancelRequest: '取消资源请求'
}

export const showErrorToast = (err) => {
  // console.error('detail', err)
  switch (err.message) {
    case 'timeout of 30000ms exceeded':
      showToast(requestMsg.timeout)
      break
    case 'canceled':
      // showToast(requestMsg.cancelRequest)
      break
    case 'Network Error':
      showToast(requestMsg.notConnectNetwork)
      break
    default:
      console.error('default', err)
  }
}
