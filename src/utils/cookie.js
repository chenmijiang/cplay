import cookie from 'react-cookies'

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load('__csrf')
}

// 用户登录，保存cookie
export const onLogin = (cookieStr) => {
  document.cookie = parseCookies(cookieStr)
}

// 用户登出，删除cookie
export const logout = () => {
  cookie.save('MUSIC_U', '', {})
  cookie.remove('MUSIC_U')
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