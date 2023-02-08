import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:3001',
  withCredentials: true,
  timeout: 1000,
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

const request = (method, url, data) => {
  return instance({
    method,
    url,
    data
  })
}

export default request
