import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import style from './glasscover.module.scss'

/**
 * 由于不同浏览器存在功能差异，目前 firefox 体验较好
 *
 * 1. 没有图片url，使用默认背景颜色
 * 2. 有图片url，加载图片
 * @param {*} props {gc_url、sameUrled}
 * @returns
 */
function Glasscover({ gc_url, sameUrled, uploadSameUrl }) {
  const [isActived, setIsActived] = useState(false) //遮罩
  const [swaped, setSwaped] = useState(false) // 背景替换
  const [currentUrl, setCurrentUrl] = useState('') //当前图片源
  const [targetUrl, setTargetUrl] = useState('') //目标图片源
  useEffect(() => {
    if (sameUrled === false) {
      let picImg = new Image()
      if (gc_url === '') {
        setTargetUrl(gc_url)
        setSwaped(true)
        setTimeout(() => {
          setCurrentUrl(gc_url)
          uploadSameUrl(true)
          setSwaped(false)
        }, 1000)
        setTimeout(() => {
          setIsActived(false)
        }, 3100)
      } else {
        picImg.onload = () => {
          setIsActived(true)

          setTargetUrl(gc_url)
          setSwaped(true) // 目标源替换现在源的动画
          setTimeout(() => {
            setCurrentUrl(gc_url) //替换当前源，动画还原，并发送action 修改 状态
            uploadSameUrl(true)
            setSwaped(false)
          }, 1000)
        }
      }
      picImg.src = gc_url
    } else {
      if (gc_url === '') {
        setIsActived(false)
      } else {
        setIsActived(true)
      }
      setCurrentUrl(gc_url)
    }
  }, [gc_url, sameUrled, uploadSameUrl])

  return (
    <motion.div
      className={style.glass_cover_bg}
      animate={{
        scale: isActived ? 2 : 1,
        filter: isActived ? 'blur(16px) brightness(64%)' : '',
      }}
    >
      <AnimatePresence>
        <motion.div
          className={style.glass_bg}
          // style={{
          //   backgroundImage: `url(${currentUrl})`,
          // }}
          // animate={{
          //   opacity: swaped ? 1 : 0,
          // }}
        ></motion.div>
      </AnimatePresence>
    </motion.div>
    // <div
    //   className={[style.glass_cover_bg, isActived ? style.bg_active : ''].join(
    //     ' '
    //   )}
    // >
    //   {/* currentUrl */}
    //   <div
    //     className={[style.glass_bg, swaped ? style.glass_hide : ''].join(' ')}
    //     style={{
    //       backgroundImage: `url(${currentUrl})`,
    //     }}
    //   ></div>
    //   {/* targetUrl */}
    //   <div
    //     className={[style.glass_bg, swaped ? style.glass_show : ''].join(' ')}
    //     style={{
    //       backgroundImage: `url(${targetUrl})`,
    //     }}
    //   ></div>
    // </div>
  )
}

export default Glasscover
