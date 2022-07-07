import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'

import {
  showLoginBox,
  getQrimg,
  getUserInfo,
} from '../redux/actions/loginActionCreator'

import { HttpManager } from '../HttpManager'
import Style from '../assets/scss/loginbox.module.scss'
import imgUrl from '../assets/img/scan_qr.png'

function LoginBox(props) {
  let {
    /* state */
    boxShowed,
    qrimg,
    keyid,
    /* dispatch */
    showLoginBox,
    getQrimg,
    // getUserInfo,
  } = props
  const [checkQrID, setCheckQrID] = useState({ iid: 0, tid: 0 })
  const [keyidBck, setKeyidBck] = useState(keyid)

  const canvas = useRef()
  useEffect(() => {
    if (boxShowed) {
      // 发送异步 action ，请求 key 和 qrimg
      getQrimg()
    }
  }, [boxShowed, getQrimg])
  useEffect(() => {
    // 刷新 canvas 的图片源
    let ctx = canvas.current.getContext('2d')
    let img = new Image()
    img.onload = async function () {
      ctx.drawImage(img, 0, 0, 256, 256)
    }
    img.src = qrimg
  }, [qrimg])
  useEffect(() => {
    // 每两秒验证一次，通过 keyid 获取 userinfo
    // 验证通过，发送 action，取消验证
    // 验证失败，取消验证
    if (keyid !== keyidBck) {
      setKeyidBck(keyid)

      const iid = setInterval(async () => {
        const ret = await HttpManager.CheckQrimg(keyid)
        if (ret.code === 803) {
          clearInterval(iid)
          getUserInfo()
          showLoginBox(false)
        }
      }, 2000) // 2s 检测一次
      if (iid !== checkQrID.iid) {
        clearInterval(checkQrID.iid)
        clearTimeout(checkQrID.tid)
      }
      const tid = setTimeout(() => {
        clearInterval(iid)
      }, 40000) // 40s 停止检测

      setCheckQrID({ iid, tid })
    }
  }, [keyid, keyidBck, checkQrID, setCheckQrID, showLoginBox])

  return (
    <div
      className={Style.login_cover}
      style={{ zIndex: props.boxShowed ? 20 : -20 }}
    >
      <div
        className={[
          Style.login_box,
          props.boxShowed ? Style.login_box_show : '',
        ].join(' ')}
      >
        <div
          className={Style.login_close}
          onClick={() => showLoginBox(false)}
        ></div>
        <div className={Style.login_contain}>
          <div className={Style.login_operation}>
            <img src={imgUrl} alt="operation" />
          </div>
          <div className={Style.login_scan}>
            <h3>扫码登录</h3>
            <div className={Style.qr}>
              <canvas
                width="256"
                height="256"
                ref={canvas}
                title="点击刷新"
                onClick={getQrimg}
              ></canvas>
            </div>
            <p className={Style.how_to_use}>
              使用&nbsp;
              <a
                href="https://music.163.com/#/download"
                target="_blank"
                rel="noreferrer"
              >
                网易云音乐APP
              </a>
              &nbsp;扫码登录
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    boxShowed: state.login.boxShowed,
    qrimg: state.login.qrimg,
    keyid: state.login.key,
  }
}

const mapDispathToProps = {
  showLoginBox,
  getQrimg,
  // getUserInfo,
}

export default connect(mapStateToProps, mapDispathToProps)(LoginBox)
