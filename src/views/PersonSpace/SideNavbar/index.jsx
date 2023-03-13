/** @format */

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { side_navlinks } from '@/configs/default'
import Image from '@/components/common/Image'

import style from './sidenavbar.module.scss'

const SideNavbar = React.memo(() => {
  const profile = useSelector((state) => state.user.profile)
  const { avatarUrl } = profile

  return (
    <div className={style.sidenav_content}>
      <NavLink to="login" className={style.user}>
        <Image src={avatarUrl} iconame="user" className={style.user_avatar} />
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
