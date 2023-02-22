import React from 'react'
import styled, { keyframes } from 'styled-components'

// 懒加载
export default function LazyLoad({ component, animation }) {
  const Comp = React.lazy(() => component)
  return (
    <React.Suspense fallback={animation ? animation : <LoadAnimations />}>
      <Comp />
    </React.Suspense>
  )
}

export function LoadAnimations() {
  return (
    <LoadAnimation>
      <div className="spinner">
        <div className="r1"></div>
        <div className="r2"></div>
        <div className="r3"></div>
        <div className="r4"></div>
        <div className="r5"></div>
      </div>
    </LoadAnimation>
  )
}

const colors = {
  alpha: 'rgb(138, 189, 202)',
  beta: 'rgb(234 147 147)',
}

const stretch = keyframes`
  0%, 20%, 49% { 
    transform: scaleY(0.4);
    background-color: ${colors.alpha};
  }
  10% { 
    transform: scaleY(1.0);
  }
  
  50%, 70%, 100% { 
    transform: scaleY(0.4);
    background-color: ${colors.beta};
  }
  
  60% { 
    transform: scaleY(1.0);
    background-color: ${colors.beta};
  }
`

const LoadAnimation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  .spinner {
    height: 52px;
  }
  .spinner > div {
    background: ${colors.alpha};
    height: 100%;
    width: 12px;
    float: left;
    margin: 0 1px;
    animation: ${stretch} 2s infinite;
    animation-timing-function: cubic-bezier(0.62, 0.28, 0.23, 0.99);
  }
  .spinner .r1 {
    animation-delay: -1s;
  }
  .spinner .r2 {
    animation-delay: -0.9s;
  }
  .spinner .r3 {
    animation-delay: -0.8s;
  }
  .spinner .r4 {
    animation-delay: -0.7s;
  }
  .spinner .r5 {
    animation-delay: -0.6s;
  }
`
