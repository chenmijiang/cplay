/** @format */

import { useState, useEffect, useRef } from 'react'

const useCopyState = (state) => {
  const [local, setLocal] = useState(state)
  const oldState = useRef(state)
  useEffect(() => {
    if (oldState.current !== state) {
      oldState.current = state
      setLocal(state)
    }
  }, [state])
  return [local, setLocal]
}

export default useCopyState
