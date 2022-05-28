import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Parallax from 'parallax-js'
import Style from '../assets/scss/404.module.scss'

function NotFound() {
  useEffect(() => {
    var scene = document.getElementById('scene')
    new Parallax(scene)
  }, [])
  const navigate = useNavigate()

  return (
    <div className={Style.not_found_body}>
      <section className={Style.wrapper}>
        <div className={Style.container}>
          <div id="scene" className={Style.scene} data-hover-only="false">
            <div className={Style.circle} data-depth="1.2"></div>

            <div className={Style.one} data-depth="0.9">
              <div className={Style.content}>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
              </div>
            </div>

            <div className={Style.two} data-depth="0.60">
              <div className={Style.content}>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
              </div>
            </div>

            <div className={Style.three} data-depth="0.40">
              <div className={Style.content}>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
                <span className={Style.piece}></span>
              </div>
            </div>

            <p className={Style.p404} data-depth="0.50">
              404
            </p>
            <p className={Style.p404} data-depth="0.10">
              404
            </p>
          </div>
          <div className={Style.text}>
            <article>
              <p>页面飞走了 - o(￣┰￣*)ゞ</p>
              <button
                onClick={() => {
                  navigate('/')
                }}
              >
                go back
              </button>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFound
