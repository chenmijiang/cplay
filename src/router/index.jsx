import React, { useEffect } from 'react'
import { useNavigate, useRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import HomePage from '@/views/HomePage'

import LoginQR from '@/views/PersonSpace/LoginQR'

export default function MRouter() {
  const element = useRoutes([
    { path: '/', element: <HomePage /> },
    {
      path: '/person',
      element: LazyLoad({ name: 'PersonSpace' }),
      children: [
        {
          path: 'login_qr',
          element: <LoginQR />,
        },
        {
          path: 'search',
          element: <LoginQR />,
        },
        {
          path: 'history',
          element: <LoginQR />,
        },
        {
          path: 'cloud',
          element: <LoginQR />,
        },
        {
          path: 'settings',
          element: <LoginQR />,
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
        key: location.pathname,
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
