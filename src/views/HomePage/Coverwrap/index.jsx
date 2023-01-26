import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Volumebar from '@/components/Volumnbar/Volumebar'

import { playPause } from '@/store/actions/playerActionCreator'
import Style from './coverwrap.module.scss'
import imgUrl from '@/assets/img/contentInner.png'

/**
 *
 * @param {*} props { cv_url }
 * @returns
 */
function Coverwrap(props) {
  let { cv_url, /* state */ paused, scrolled, /* dispatch */ playPause } = props
  const [volumeShowed, setVolumeShowed] = useState(false)
  const [url, setUrl] = useState(imgUrl)
  useEffect(() => {
    setUrl(cv_url ? cv_url : imgUrl)
  }, [cv_url])

  return (
    <div className={Style.cvrwrap}>
      <div className={Style.u_cover}>
        <img
          src={url}
          alt=""
          srcSet=""
          className={[
            Style.cover_img,
            paused || !scrolled ? '' : Style.cover_img_scroll,
          ].join(' ')}
        />
        <span className={Style.msk}></span>
      </div>
      <div className={Style.btns_handle}>
        <div>
          <i className={[Style.icon, Style.edit_history].join(' ')}></i>
        </div>
        <div>
          <i
            className={[
              Style.icon,
              Style.play_pause,
              paused ? '' : Style.play_active,
            ].join(' ')}
            onClick={() => {
              playPause(!paused)
            }}
          ></i>
        </div>
        <div>
          <i
            className={[Style.icon, Style.volume_ctr].join(' ')}
            onClick={() => {
              setVolumeShowed(!volumeShowed)
            }}
          ></i>
          <Volumebar
            isShow={volumeShowed}
            volumebarHide={() => {
              setVolumeShowed(false)
            }}
          ></Volumebar>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    paused: state.player.paused,
    scrolled: state.player.scrolled,
  }
}

const mapDispathToProps = {
  playPause,
}

export default connect(mapStateToProps, mapDispathToProps)(Coverwrap)
