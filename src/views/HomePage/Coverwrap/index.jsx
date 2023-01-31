import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Volumebar from '@/components/Volumnbar'

import player from '@/store/player'
import imgUrl from '@/assets/img/contentInner.png'
import style from './coverwrap.module.scss'

/**
 *
 * @param {*} props { cv_url }
 * @returns
 */
function Coverwrap({
  cv_url,
  /* state */ 
  paused,
  scrolled,
  /* dispatch */ 
  playPause,
}) {
  const [volumeShowed, setVolumeShowed] = useState(false)
  const [url, setUrl] = useState(imgUrl)
  useEffect(() => {
    setUrl(cv_url ? cv_url : imgUrl)
  }, [cv_url])

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
        <div>
          <i className={[style.icon, style.edit_history].join(' ')}></i>
        </div>
        <div>
          <i
            className={[
              style.icon,
              style.play_pause,
              paused ? '' : style.play_active,
            ].join(' ')}
            onClick={() => {
              playPause(!paused)
            }}
          ></i>
        </div>
        <div>
          <i
            className={[style.icon, style.volume_ctr].join(' ')}
            onClick={() => {
              setVolumeShowed(!volumeShowed)
            }}
          ></i>
          {volumeShowed && <Volumebar setVolumeShowed={setVolumeShowed} />}
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
  playPause: player.actions.playPause,
}

export default connect(mapStateToProps, mapDispathToProps)(Coverwrap)
