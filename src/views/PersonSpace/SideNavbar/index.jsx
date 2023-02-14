import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { side_navlinks } from '@/configs/default'
import Image from '@/components/common/Image'

import style from './sidenavbar.module.scss'
import { getUserInfo } from '@/store/user.slice'

const SideNavbar = React.memo(() => {
  const { profile } = useSelector((state) => state.user)
  const { nickname, avatarUrl } = profile
  const dispatch = useDispatch()
  useEffect(() => {
    if (nickname === '' || avatarUrl === '') {
      dispatch(getUserInfo())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={style.sidenav_content}>
      <NavLink
        to="login"
        className={style.user}
      >
        <Image
          src={avatarUrl}
          iconame="user"
          root="#root"
          className={style.user_avatar}
        />
        {/* <Icon name="user" /> */}
      </NavLink>
      {side_navlinks.map((link) => (
        <NavLink
          key={link.id}
          to={link.id}
          title={link.name}
          className={({ isActive }) =>
            [style.navlink, isActive ? style.navlink_active : ''].join(' ')
          }
        >
          {link.icon}
        </NavLink>
      ))}
    </div>
  )
})

export default SideNavbar
