import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import Progressbar from '@/components/Progressbar'

import style from './volumebar.module.scss'
import { setVolume } from '@/store/play.slice'

function Volumebar({
  setVolumeShowed
}) {
  const volumeState = useSelector((state) => state.player.volume)
  const dispatch = useDispatch()
  return (
    <motion.div
      className={style.volume_box}
      initial={{ width: 35, opacity: 0 }}
      animate={{ width: 125, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      onHoverEnd={(e) => {
        setVolumeShowed(false)
      }}
    >
      <div className={style.volume_contain}>
        <Progressbar
          maxValue={100}
          curPercent={volumeState}
          setCurrentTime={(p) => {
            dispatch(setVolume(p))
          }}
        />
      </div>
    </motion.div>
  )
}

export default Volumebar
