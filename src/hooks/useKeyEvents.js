/** @format */

import { useState, useEffect } from 'react'

export default function useKeyEvents() {
  const [keyEvents, setKeyEvents] = useState()

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeyEvents(e)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return keyEvents
}
