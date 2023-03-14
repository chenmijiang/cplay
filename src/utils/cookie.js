/** @format */

import cookie from 'react-cookies'

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load('userinfo')
}

// 用户登录，保存cookie
export const onLogin = (cookieStr) => {
  cookie.save('userinfo', 'https://github.com/chenmijiang/cplay', {
    path: '/',
    maxAge: 60 * 60 * 24 * 300,
    expires: new Date(Date.now() + 60 * 60 * 24 * 300)
  })
  document.cookie = parseCookies(cookieStr)
}

// 刷新登录
export const refreshCookie = onLogin

// 用户登出，删除cookie
export const logout = () => {
  cookie.save('MUSIC_U', '', {})
  cookie.remove('MUSIC_U')
  cookie.remove('userinfo')
  cookie.remove('__csrf')
}

// cookie 解析
export const parseCookies = (cookieStr) => {
  const cookies = cookieStr.split(/;(?=\S)/)
  let res = []
  cookies.forEach((item) => {
    if (item.match(/^(MUSIC_U|__csrf)/)) {
      res.push(item)
    }
  })
  return res.join(';')
}
