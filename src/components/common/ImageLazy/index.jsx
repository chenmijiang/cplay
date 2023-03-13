/** @format */

import React, { useState, useRef, useEffect } from 'react'
import { useInViewport } from 'ahooks'
import styled, { keyframes } from 'styled-components'

import Icon from '@/components/common/IconSvg'

const ImageLazy = React.memo(({ src, iconame, root, ...props }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const imageRef = useRef(null)
  const [inViewport] = useInViewport(imageRef)
  useEffect(() => {
    if (inViewport) {
      const img = imageRef.current
      if (src !== '' && src !== undefined) {
        img.src = src
        // 从缓存中读出
        img.complete && setIsLoading(false)
      } else {
        setIsError(true)
      }
    }
  }, [inViewport, src])
  return (
    <ImageWrapper {...props}>
      {/* 加载动画 */}
      {isLoading && (
        <div className="loading">
          <Motion isError={isError}>
            <Icon name={iconame} />
          </Motion>
        </div>
      )}
      <img
        ref={imageRef}
        alt={iconame}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setIsError(true)
        }}
      />
    </ImageWrapper>
  )
})

const ImageWrapper = styled.div`
  transform: scale(0.8);
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid var(--bg-gray-100);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: var(--bg-white-100);
    box-sizing: border-box;
    z-index: 1;
  }
  .icon {
    width: 40px;
    height: 40px;
    transition: fill 0.2s;
    fill: var(--bg-gray-100);
  }
  img,
  .motion {
    width: inherit;
    height: inherit;
  }
`
const lodingAnimation = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0.5;
}
`
const Motion = styled.div`
  width: inherit;
  height: inherit;
  animation: ${lodingAnimation} 0.4s linear 0s infinite alternate-reverse;
  animation-play-state: ${({ isError }) => (isError ? 'paused' : 'running')};
`

export default ImageLazy
