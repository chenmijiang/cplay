import React from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ dom, children }) => {
  dom = dom || document.body
  return createPortal(<>{children}</>, dom)
}

export default Portal
