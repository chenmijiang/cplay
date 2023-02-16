import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import Icon from '@/components/common/IconSvg'
import { createQrKey, checkQrCode, getUserInfo } from '@/store/user.slice'

const LoginQR = React.memo(() => {
  const { key, qrimg, verify } = useSelector((state) => state.user)
  const { code } = verify
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 1. 挂载：获取 key 和 qrimg
  useEffect(() => {
    dispatch(createQrKey())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 2. 监听 key 的失效，设置 130 秒，每 4 秒检测一次
  const checkRef = useRef(0)
  const [hintFresh, setHintFresh] = useState(false)
  const setCycleCheck = useCallback(
    (key, interval = 4000, duration = 130000) => {
      let lock = false
      const id = setInterval(() => {
        dispatch(checkQrCode(key)).then(({ payload }) => {
          let { cookie } = payload
          if (cookie !== '' && !lock) {
            lock = true
            dispatch(getUserInfo())
          }
        })
      }, interval)
      setTimeout(() => {
        setHintFresh(true)
        clearInterval(id)
      }, duration)
      return id
    },
    [dispatch]
  )
  useEffect(() => {
    if (key !== '') {
      checkRef.current = setCycleCheck(key)
    }
    return () => {
      clearInterval(checkRef.current)
    }
  }, [key, setCycleCheck])
  useEffect(() => {
    if (code === 1) {
      // 2.1 成功，跳转到 /space
      clearInterval(checkRef.current)
      navigate('/space')
    } else if (code === 2) {
      // 2.2 失效，提示刷新
      setHintFresh(true)
    }
  }, [code, navigate, dispatch])
  // 处理 key 刷新
  const refreshQrKey = () => {
    dispatch(createQrKey()).then(() => {
      setHintFresh(false)
    })
  }
  return (
    <LoginQRWrapper>
      <div className="qr_box">
        <div className="qr_contain">
          {hintFresh && (
            <div className="refresh_hint">
              <p onClick={refreshQrKey}>二维码已失效，请点击刷新</p>
            </div>
          )}
          <div className="qr_img">
            {qrimg === '' ? (
              <>
                <LoadingQR />
                <Icon name="qr" />
              </>
            ) : (
              <img
                src={qrimg}
                alt="二维码"
              />
            )}
          </div>
        </div>
        <div className="scan_hint">
          请使用<b> 网易云App </b>扫描二维码登录
        </div>
      </div>
    </LoginQRWrapper>
  )
})

const LoginQRWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 144px);
  display: flex;
  justify-content: center;
  align-items: center;
  .qr_contain {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px solid var(--bg-gray-100);
    border-radius: 10px;
  }
  .refresh_hint {
    width: inherit;
    height: inherit;
    position: absolute;
    background: var(--bg-black-150);
    cursor: pointer;
    p {
      color: var(--font-white-100);
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 200px;
    }
  }
  .qr_img {
    width: 100%;
    height: 100%;
    img {
      width: inherit;
      height: inherit;
    }
    .icon {
      fill: var(--bg-black-110);
      width: inherit;
      height: inherit;
    }
  }
  .scan_hint {
    font-size: 12px;
    color: var(--font-gray-200);
    text-align: center;
    margin-top: 10px;
    b {
      color: var(--font-red-100);
      font-weight: bold;
    }
  }
`
const circle = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingQR = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border: 4px solid #000;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-right-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  animation: ${circle} infinite 0.75s linear;
`

export default LoginQR
