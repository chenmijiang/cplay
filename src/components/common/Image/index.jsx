import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Icon from '@/components/common/IconSvg'

const Image = ({ src, iconame, root, ...props }) => {
  // 参数： 图片源
  // 实现 懒加载 和 加载动画
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    // 实现懒加载的核心代码
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = imageRef.current
            if (src) {
              img.src = src
              // 从缓存中读出
              img.complete && setIsLoading(false)
            } else {
              setIsError(true)
            }
            observer.disconnect()
          }
        })
      },
      { root: document.querySelector(`${root}`) }
    )
    observer.observe(imageRef.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ImageWrapper {...props}>
      {/* 加载动画 */}
      {isLoading && (
        <div className="loading">
          <motion.div
            className="motion"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.5 }}
            transition={{
              duration: 0.4,
              repeat: isError ? 1 : Infinity,
              repeatType: 'reverse',
            }}
          >
            <Icon name={iconame} />
          </motion.div>
        </div>
      )}
      <img
        ref={imageRef}
        alt={iconame}
        // style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={() => {
          setIsLoading(false)
        }}
        onError={() => {
          setIsError(true)
        }}
      />
    </ImageWrapper>
  )
}

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

export default Image
