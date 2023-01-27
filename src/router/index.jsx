import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import HomePage from '@/views/HomePage'

function MRouter() {
  return useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/person', element: LazyLoad({ name: 'PersonSpace' }) },
    { path: '*', element: LazyLoad({ name: 'NotFound' }) },
  ])
}

// 懒加载
function LazyLoad({ name, animation }) {
  const Comp = React.lazy(() => import(`@/views/${name}`))
  return (
    <React.Suspense fallback={animation ? animation : <div>Loding...</div>}>
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

export default MRouter
