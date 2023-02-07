import React, { useEffect } from 'react'
import { useNavigate, useRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import LazyLoad from '@/components/common/LazyLoad'
import MessageInfo from '@/components/common/MessageInfo'

import HomePage from '@/views/HomePage'
import PersonSpace from '@/views/PersonSpace'

export default function MRouter() {
  const element = useRoutes([
    { path: '/', element: <HomePage /> },
    {
      path: '/space',
      element: <PersonSpace />,
      caseSensitive: true,
      children: [
        {
          index: true,
          element: <MessageInfo />,
        },
        {
          path: 'login',
          element: LazyLoad('PersonSpace/LoginQR'),
        },
        {
          path: 'search',
          element: LazyLoad('PersonSpace/SearchPage'),
        },
        {
          path: 'history',
          element: LazyLoad('PersonSpace/HistoryPage'),
        },
        {
          path: 'cloud',
          element: LazyLoad('PersonSpace/CloudPage'),
        },
        {
          path: 'settings',
          element: LazyLoad('PersonSpace/SettingsPage'),
        },
      ],
    },
    { path: '*', element: LazyLoad('NotFound') },
  ])

  const location = useLocation()

  if (!element) return null

  return (
    <AnimatePresence initial={false}>
      {React.cloneElement(element, {
        location: { location },
        key: location.pathname.includes('/space')
          ? '/space'
          : location.pathname,
      })}
    </AnimatePresence>
  )
}

// 重定向
function Redirect({ to }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to, { replace: true })
  }, [navigate, to])
  return null
}

// 路由拦截
export function AuthComponent({ children }) {
  const isLogin = localStorage.getItem('token')
  return isLogin ? children : <Redirect to="/" />
}
