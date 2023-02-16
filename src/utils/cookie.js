import cookie from 'react-cookies'

// 获取当前用户cookie
export const loginUser = () => {
  return cookie.load('userinfo')
}

// 用户登录，保存cookie
export const onLogin = (cookieStr) => {
  const cookieObj = parseCookies(cookieStr)
  cookie.save('MUSIC_U', cookieObj['MUSIC_U'], {
    path: '/',
    maxAge: parseInt(cookieObj['Max-Age']),
    expires: new Date(cookieObj['Expires']),
    httpOnly: cookieObj['HTTPOnly']
  })
  cookie.save('userinfo', 'https://github.com/chenmijiang', {
    path: '/',
    maxAge: parseInt(cookieObj['Max-Age']),
    expires: new Date(cookieObj['Expires']),
  })
}

// 用户登出，删除cookie
export const logout = () => {
  cookie.save('MUSIC_U', '', {})
  cookie.remove('MUSIC_U')
  cookie.remove('userinfo')
}

// cookie 解析
export const parseCookies = (cookieStr) => {
  const cookie = cookieStr.split(/;(?=\S)/)[0]
  const cookieObj = {}
  const arr = cookie.split('; ')
  arr.forEach(item => {
    if (item === 'HTTPOnly') {
      cookieObj[item] = true
      return
    }
    const temp = item.split('=')
    cookieObj[temp[0]] = temp[1]
  })
  cookieObj[arr[0]] = cookieObj
  return cookieObj
}