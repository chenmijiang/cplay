import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

function MRouter({ routes }) {
  return useRoutes(parseRoutes(routes))
}

// 路由解析
function parseRoutes(routes) {
  return routes.map((route) => {
    route.element = LazyLoad({ name: route.component })
    if (route.children) {
      return {
        ...route,
        children: parseRoutes(route.children),
      }
    }
    return {
      ...route,
    }
  })
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
