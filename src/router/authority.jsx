/** @format */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LazyLoad from '@/components/common/LazyLoad'
import { loginUser as loginUserCookie } from '@/utils/cookie'

export const Authority = ({ component }) => {
  const navigate = useNavigate()
  const useInfo = loginUserCookie()
  // 没有登录信息，跳转到登录页面
  useEffect(() => {
    if (!useInfo) {
      navigate('/space/login', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <LazyLoad component={component} />
}

/**
 * 用于 登录页面 和 注册页面
 * @param {*} Component
 * @returns
 */
export const AuthorityLogin = ({ component }) => {
  const navigate = useNavigate()
  const useInfo = loginUserCookie()
  // 登录信息，跳转到用户页面
  useEffect(() => {
    if (useInfo) {
      navigate('/space', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <LazyLoad component={component} />
}
