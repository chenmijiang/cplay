import React from 'react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'

import Progressbar from '@/components/Progressbar'

import player from '@/store/player'
import style from './volumebar.module.scss'

function Volumebar({
  setVolumeShowed,
  /* state */
  volume,
  /* dispatch */
  setVolume,
}) {
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
          curPercent={volume}
          setCurrentTime={(p) => {
            setVolume(p)
          }}
        />
      </div>
    </motion.div>
  )
}

const mapStateToProps = (state) => {
  return {
    volume: state.player.volume,
  }
}

const mapDispathToProps = {
  setVolume: player.actions.setVolume,
}

export default connect(mapStateToProps, mapDispathToProps)(Volumebar)
