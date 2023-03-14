/** @format */

import { useRef, useEffect } from 'react'
import { cancelAllPendingRequests } from '@/apis'

// 取消所有挂起的请求
function useFecthCancel() {
  const cancelRef = useRef(null)
  useEffect(() => {
    cancelRef.current = cancelAllPendingRequests
    return () => {
      cancelRef.current()
    }
  }, [])
  return cancelRef
}

export default useFecthCancel
