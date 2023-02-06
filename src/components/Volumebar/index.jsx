import React from 'react'
import { connect } from 'react-redux'
import { motion } from 'framer-motion'

import Progressbar from '@/components/Progressbar'

import player from '@/store/player'
import style from './volumebar.module.scss'

function Volumebar({
  setVolumeShowed,
  volumeState,
  setVolumeDispatch,
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
          curPercent={volumeState}
          setCurrentTime={(p) => {
            setVolumeDispatch(p)
          }}
        />
      </div>
    </motion.div>
  )
}

const mapStateToProps = (state) => {
  return {
    volumeState: state.player.volume,
  }
}

const mapDispathToProps = {
  setVolumeDispatch: player.actions.setVolume,
}

export default connect(mapStateToProps, mapDispathToProps)(Volumebar)
