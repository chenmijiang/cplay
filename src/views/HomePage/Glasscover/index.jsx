import { AnimatePresence, motion, useTime, useTransform } from 'framer-motion'
import React, { useLayoutEffect, useState, useRef } from 'react'

import { glassCoverVariant } from '@/variants'
import useSyncCallback from '@/hooks/useSyncCallback'
import style from './glasscover.module.scss'
/**
 *
 * 1. 没有图片url，使用默认背景颜色
 * 2. 有图片url，加载图片
 *
 * @param {*} props {targetUrl}
 * @returns
 */
const Glasscover = React.memo(({ targetUrl }) => {
  const [actived, setActived] = useState(false)
  const intialized = useRef([true, 0])
  const time = useTime()
  const filterArr = [
    'blur(0px) brightness(100%)',
    'blur(5px) brightness(89%)',
    'blur(10px) brightness(75%)',
    'blur(16px) brightness(64%)',
  ]
  const filter = useTransform(time, [100, 200, 300, 400], filterArr)
  const filterReverse = useTransform(
    time,
    [100, 200, 300, 400],
    filterArr.reverse()
  )

  useLayoutEffect(() => {
    if (intialized.current[0] === true) {
      if (intialized.current[1] === 0) {
        intialized.current[1]++
      } else {
        intialized.current[0] = false
      }
    }
    targetUrl !== '' && setActived(true)
  }, [targetUrl, setActived])
  const animationEnd = useSyncCallback(() => {
    targetUrl === '' && setActived(false)
  })

  return (
    <motion.div
      className={style.glass_mask}
      style={{
        filter: !intialized.current[0]
          ? actived
            ? filter
            : filterReverse
          : actived
          ? 'blur(16px) brightness(64%)'
          : 'blur(0px) brightness(100%)',
        transform: `scale(${actived ? 2 : 1})`,
      }}
    >
      <AnimatePresence
        initial={false}
        custom={actived}
      >
        <motion.img
          className={style.glass_img}
          key={targetUrl}
          src={targetUrl}
          variants={glassCoverVariant}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ opacity: { duration: actived ? 0.8 : 0.4 } }}
          onAnimationComplete={animationEnd}
        />
      </AnimatePresence>
    </motion.div>
  )
})

export default Glasscover