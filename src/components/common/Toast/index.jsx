/** @format */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { dismissToast } from '@/store/toast.slice'

const Toast = React.memo(() => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.toast.message)
  const duration = useSelector((state) => state.toast.duration)

  useEffect(() => {
    if (message) {
      const timerId = setTimeout(() => {
        dispatch(dismissToast())
      }, duration)
      return () => clearTimeout(timerId)
    }
  }, [message, duration, dispatch])

  return (
    <ToastContent
      key={new Date().getTime()}
      initial={{ opacity: 0 }}
      animate={{ opacity: message ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="message">{message}</span>
    </ToastContent>
  )
})

const ToastContent = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--bg-black-100);
  color: var(--font-white-100);
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 10;
  cursor: default;
`

export default Toast
