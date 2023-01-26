import React from 'react'
import { connect } from 'react-redux'

import Progressbar from '@/components/Progressbar'

import { setVolume } from '@/store/actions/playerActionCreator'
import Style from './volumebar.module.scss'

function Volumebar(props) {
  let { isShow, /* state */ volume, /* dispatch */ setVolume } = props
  return (
    <div
      className={[Style.volume_box, isShow ? Style.show : ''].join(' ')}
      onMouseLeave={() => {
        props.volumebarHide()
      }}
    >
      <div className={Style.volume_contain}>
        <Progressbar
          maxValue={100}
          curPercent={volume}
          setCurrentTime={(p) => {
            setVolume(p)
          }}
        ></Progressbar>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    volume: state.player.volume,
  }
}

const mapDispathToProps = {
  setVolume,
}

export default connect(mapStateToProps, mapDispathToProps)(Volumebar)
