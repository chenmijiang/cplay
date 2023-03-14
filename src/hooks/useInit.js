/** @format */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setBaseUrl } from '@/apis'
import { initDB } from '@/hooks/useSongsDB'
import { loginUser as loginUserCookie } from '@/utils/cookie'
import { refreshLogin } from '@/store/user.slice'

function useInit() {
  const baseUrl = useSelector((state) => state.setting.baseUrl)
  const dispatch = useDispatch()
  const useInfo = loginUserCookie()
  useEffect(() => {
    // 初始化 请求地址
    if (baseUrl) {
      setBaseUrl(baseUrl)
    }
    // 初始化 db
    initDB()
    // 更新 cookies
    if (useInfo) {
      dispatch(refreshLogin())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useInit
