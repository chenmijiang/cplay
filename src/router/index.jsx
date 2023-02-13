import React from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import config from './config'

export default function MRouter() {
  const element = useRoutes(config)
  const location = useLocation()

  if (!element) return null

  return (
    <AnimatePresence initial={false}>
      {React.cloneElement(element, {
        location: { location },
        key: location.pathname.includes('/space')
          ? '/space'
          : location.pathname,
      })}
    </AnimatePresence>
  )
}
