import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Parallax from 'parallax-js'
import style from './notfound.module.scss'

function NotFound() {
  useEffect(() => {
    var scene = document.getElementById('scene')
    new Parallax(scene)
  }, [])
  const navigate = useNavigate()

  return (
    <div className={style.not_found_body}>
      <section className={style.wrapper}>
        <div className={style.container}>
          <div
            id="scene"
            className={style.scene}
            data-hover-only="false"
          >
            <div
              className={style.circle}
              data-depth="1.2"
            ></div>

            <div
              className={style.one}
              data-depth="0.9"
            >
              <div className={style.content}>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
              </div>
            </div>

            <div
              className={style.two}
              data-depth="0.60"
            >
              <div className={style.content}>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
              </div>
            </div>

            <div
              className={style.three}
              data-depth="0.40"
            >
              <div className={style.content}>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
                <span className={style.piece}></span>
              </div>
            </div>

            <p
              className={style.p404}
              data-depth="0.50"
            >
              404
            </p>
            <p
              className={style.p404}
              data-depth="0.10"
            >
              404
            </p>
          </div>
          <div className={style.text}>
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
