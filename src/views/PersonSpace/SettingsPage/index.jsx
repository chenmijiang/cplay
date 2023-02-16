import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import Image from '@/components/common/Image'
import Icon from '@/components/common/IconSvg'

import { logout } from '@/store/user.slice'
import { playPause } from '@/store/play.slice'

const SettingsPage = () => {
  // 获取用户信息
  const { profile } = useSelector((state) => state.user)
  const { nickname, avatarUrl } = profile
  const dispatch = useDispatch()
  // 退出登录
  const logoutHandler = () => {
    dispatch(playPause(true))
    dispatch(logout())
  }
  return (
    <SettingsWrapper>
      {/* 退出登录 */}
      <Logout>
        {/* 头像 */}
        <div className="avatar">
          <Image
            src={avatarUrl}
            iconame="user"
            className="user_avatar"
          />
        </div>
        {/* 昵称 */}
        <div className="nickname">{nickname}</div>
        {/* 登出按钮 */}
        <div
          className="logout"
          onClick={logoutHandler}
        >
          <div className="logout_svg">
            <Icon name="logout" />
          </div>
          登出
        </div>
      </Logout>
    </SettingsWrapper>
  )
}

const SettingsWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
`

const Logout = styled.div`
  background: var(--bg-gray-210);
  border-radius: 20px;
  display: grid;
  align-items: center;
  height: 100px;
  color: var(--font-gray-200);
  grid-template-columns: 120px 200px 1fr 160px;
  .avatar {
    width: 80px;
    height: 80px;
    margin-left: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .user_avatar {
    width: 100%;
    height: 100%;
    transform: scale(1);
    border: none;

    .icon {
      width: inherit;
      height: inherit;
      fill: var(--bg-gray-100);
    }
  }
  .nickname {
    font-size: 32px;
    font-weight: bold;
  }
  .logout {
    grid-column: 4;
    height: 36px;
    line-height: 38px;
    cursor: pointer;
    width: 90px;
    transition: all 0.3s;
    border-radius: 8px;
    .logout_svg {
      float: left;
      margin: 0 10px;
      width: 24px;
      height: 36px;
      svg {
        width: inherit;
        height: inherit;
        fill: var(--bg-gray-100);
        transition: all 0.3s;
      }
    }
    &:hover {
      background-color: var(--bg-gray-210);
      color: var(--font-red-100);
      svg {
        fill: var(--font-red-100);
      }
    }
  }
`

export default SettingsPage
