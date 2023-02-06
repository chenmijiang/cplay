import React, { useEffect } from 'react'
import { useNavigate, useRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import HomePage from '@/views/HomePage'
import PersonSpace from '@/views/PersonSpace'

import MessageInfo from '@/views/PersonSpace/MessageInfo'

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
          element: <MessageInfo />,
        },
        {
          path: 'search',
          element: <MessageInfo />,
        },
        {
          path: 'history',
          element: <MessageInfo />,
        },
        {
          path: 'cloud',
          element: <MessageInfo />,
        },
        {
          path: 'settings',
          element: <MessageInfo />,
        },
      ],
    },
    { path: '*', element: LazyLoad({ name: 'NotFound' }) },
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

// 懒加载
function LazyLoad({ name, animation }) {
  const Comp = React.lazy(() => import(`@/views/${name}`))
  return (
    <React.Suspense
      fallback={
        animation ? (
          animation
        ) : (
          <div
            style={{
              width: '100%',
              height: '100vh',
              backgroundColor: 'var(--bg-cyan-100)',
            }}
          >
            Loding...
          </div>
        )
      }
    >
      <Comp></Comp>
    </React.Suspense>
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
