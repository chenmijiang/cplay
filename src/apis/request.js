import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  timeout: 30000,
})

// 取消请求令牌的容器
const pendingRequests = new Map()

// 生成取消令牌的标识
const generateCancelTokenKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

instance.interceptors.request.use((config) => {
  // 取消请求令牌
  const cancelToken = new axios.CancelToken((cancel) => {
    const key = generateCancelTokenKey(config)
    pendingRequests.set(key, cancel)
  })
  config.cancelToken = cancelToken
  return config
})

instance.interceptors.response.use(
  response => {
    // 清除请求令牌
    const key = generateCancelTokenKey(response.config)
    pendingRequests.delete(key)
    return response.data
  },
  error => Promise.reject(error)
)

const request = (method, url, data, params) => {
  return instance({
    method,
    url,
    data,
    params
  })
}

// 取消所有挂起的请求
export const cancelAllPendingRequests = () => {
  for (const [key, cancel] of pendingRequests.entries()) {
    cancel(`Cancel request: ${key}`)
    pendingRequests.delete(key)
  }
}

export const setBaseUrl = (url) => {
  instance.defaults.baseURL = url
}

// 测试接口
export const testUrl = (baseURL) => {
  return request('get', `${baseURL}/login/qr/key`, null, { timestamp: Date.now() })
}

export default request
