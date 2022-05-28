import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 懒加载
export function LazyLoad(Temp) {
  const Comp = React.lazy(() => import(`../views/${Temp}`))
  return (
    <React.Suspense fallback={<div>Loding...</div>}>
      <Comp></Comp>
    </React.Suspense>
  )
}

// 重定向
export function Redirect(props) {
  let { to } = props
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to, { replace: true })
  }, [navigate, to])
  return null
}

// 路由拦截
export function AuthComponent(props) {
  const isLogin = localStorage.getItem('token')
  return isLogin ? props.children : <Redirect to="/" />
}
