import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Volumebar from '@/components/Volumebar'

import contentInner from '@/assets/img/contentInner.png'
import style from './coverwrap.module.scss'
import { btnTapSpringVariant } from '@/variants'

/**
 *
 * @param {*} props { coverUrl, paused, scrolled, playPause }
 * @returns
 */
const Coverwrap = React.memo(({ coverUrl, paused, scrolled, playPause }) => {
  const [volumeShowed, setVolumeShowed] = useState(false)
  const [url, setUrl] = useState(contentInner)
  useEffect(() => {
    setUrl(coverUrl ? coverUrl : contentInner)
  }, [coverUrl])
  const navigate = useNavigate()

  return (
    <div className={style.cvrwrap}>
      <div className={style.u_cover}>
        <img
          src={url}
          alt="cover"
          srcSet=""
          className={[
            style.cover_img,
            paused || !scrolled ? '' : style.cover_img_scroll,
          ].join(' ')}
        />
        <span className={style.msk}></span>
      </div>
      <div className={style.btns_handle}>
        {/* edit history */}
        <div>
          <motion.i
            variants={btnTapSpringVariant}
            whileTap="tap"
            className={[style.icon, style.edit_history].join(' ')}
            onClick={() => {
              navigate('/space/history')
            }}
          ></motion.i>
        </div>
        {/* play control */}
        <div>
          <motion.i
            variants={btnTapSpringVariant}
            whileTap="tap"
            className={[
              style.icon,
              style.play_pause,
              paused ? '' : style.play_active,
            ].join(' ')}
            onClick={() => {
              playPause(!paused)
            }}
          ></motion.i>
        </div>
        {/* volume control */}
        <div>
          <motion.i
            variants={btnTapSpringVariant}
            whileTap="tap"
            className={[style.icon, style.volume_ctr].join(' ')}
            onClick={() => {
              setVolumeShowed(!volumeShowed)
            }}
          ></motion.i>
          <AnimatePresence>
            {volumeShowed && <Volumebar setVolumeShowed={setVolumeShowed} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
})

export default Coverwrap
