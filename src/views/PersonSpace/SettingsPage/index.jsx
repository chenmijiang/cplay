/** @format */

import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Image from '@/components/common/Image'
import Icon from '@/components/common/IconSvg'

import { logout } from '@/store/user.slice'
import { playPause } from '@/store/play.slice'
import { setBaseUrl, setMusicQuality } from '@/store/setting.slice'
import { setAnimationTime } from '@/store/setting.slice'
import { showToast } from '@/store/toast.slice'
import { testUrl } from '@/apis'

import { routerSwitchVariant } from '@/variants'

import { qualityItems } from '@/configs/default'
import useFecthCancel from '@/hooks/useFetchCancel'

const SettingsPage = () => {
  useFecthCancel()
  // 获取用户信息
  const { profile, quality, baseUrl, animationTime } = useSelector((state) => ({
    profile: state.user.profile,
    quality: state.setting.quality,
    baseUrl: state.setting.baseUrl,
    animationTime: state.setting.animationTime
  }))
  const { nickname, avatarUrl } = profile
  const dispatch = useDispatch()
  // 退出登录
  const logoutHandler = () => {
    dispatch(playPause(true))
    dispatch(logout())
  }
  // 音质选择
  const selectQuality = (e) => {
    dispatch(setMusicQuality(e.target.value))
  }
  // 接口测试
  const apiRef = useRef()
  const testApi = () => {
    let url = apiRef.current.value
    if (/^https?:\/\//.test(url)) {
      // 测试接口
      testUrl(url)
        .then(() => {
          dispatch(setBaseUrl(url))
          apiRef.current.value = ''
          // toast 提示
          dispatch(showToast({ message: '接口测试成功' }))
        })
        .catch((e) => {
          // toast 提示
          dispatch(showToast({ message: '接口测试失败' }))
        })
    }
  }
  const resetApi = () => {
    dispatch(setBaseUrl('https://cplay-api.vercel.app'))
    apiRef.current.value = ''
  }
  // 设置 滚动动画
  const aniamtionRef = useRef()
  const AnimationTime = () => {
    let time = aniamtionRef.current.value
    if (time === '') return
    if (200 <= +time && +time <= 800) {
      dispatch(setAnimationTime(time))
      aniamtionRef.current.value = ''
      dispatch(showToast({ message: '设置成功' }))
    } else {
      dispatch(showToast({ message: '超出范围200~800(ms)' }))
    }
  }
  const resetAnimationTime = () => {
    dispatch(setAnimationTime(300))
    aniamtionRef.current.value = ''
  }
  return (
    <SettingsWrapper
      variants={routerSwitchVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="settings"
    >
      {/* 退出登录 */}
      <Logout>
        {/* 头像 */}
        <div className="avatar">
          <Image src={avatarUrl} iconame="user" className="user_avatar" />
        </div>
        {/* 昵称 */}
        <div className="nickname">{nickname}</div>
        {/* 登出按钮 */}
        <div className="logout" onClick={logoutHandler}>
          <div className="logout_svg">
            <Icon name="logout" />
          </div>
          登出
        </div>
      </Logout>
      {/* 音质设置 */}
      <SoundQuality>
        <h2>音质设置</h2>
        <div className="setting_item">
          <select name="quality" onChange={selectQuality} defaultValue={quality}>
            {qualityItems.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </SoundQuality>
      {/* 自定义后台接口 */}
      <CustomApi>
        <h2>自定义后台接口</h2>
        <div className="setting_item">
          <input type="text" placeholder={baseUrl} ref={apiRef} />
          <button onClick={testApi}>测试</button>
          <button onClick={resetApi}>重置</button>
        </div>
      </CustomApi>
      {/* 滚动动画 */}
      <AnimationWrapper>
        <h2>歌词滚动动画时间</h2>
        <div className="setting_item">
          <input type="number" placeholder={animationTime} ref={aniamtionRef} />
          <button onClick={AnimationTime}>设置</button>
          <button onClick={resetAnimationTime}>重置</button>
        </div>
      </AnimationWrapper>
    </SettingsWrapper>
  )
}

const SettingsWrapper = styled(motion.div)`
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
  grid-template-columns: 130px 200px 1fr 120px;
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
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  font-size: 20px;
  font-weight: bold;
  color: var(--font-gray-200);
  h2 {
    margin-left: 10px;
  }
  .setting_item {
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    color: var(--font-gray-200);
    border-radius: 12px;
    overflow: hidden;
    font-size: 14px;
  }
`
const SoundQuality = styled(SettingItem)`
  margin-top: 20px;
  .setting_item {
    background: var(--bg-gray-210);
  }
  select {
    width: 160px;
    height: inherit;
    border: none;
    outline: none;
    appearance: none;
    color: inherit;
    background: transparent;
  }
  option {
    text-align: center;
  }
`
const CustomApi = styled(SettingItem)`
  .setting_item {
    display: flex;
  }
  input {
    height: inherit;
    padding: 0 10px;
    width: 300px;
    min-width: 150px;
    background: var(--bg-gray-210);
  }
  button {
    height: inherit;
    padding: 0 24px;
    cursor: pointer;
    border-left: 1px solid var(--bg-gray-100);
    background: var(--bg-gray-210);
    transition: all 0.1s;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
`
const AnimationWrapper = styled(CustomApi)`
  input {
    width: 150px;
    min-width: 100px;
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`
export default SettingsPage
