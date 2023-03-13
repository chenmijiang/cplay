/** @format */

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getUserInfo, logout } from '@/store/user.slice'

const UserInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      UserInfo
      <button
        onClick={() => {
          dispatch(logout())
        }}
      >
        clear cookies
      </button>
    </div>
  )
}

export default UserInfo
