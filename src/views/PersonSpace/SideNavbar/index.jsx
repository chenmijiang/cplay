import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '@/components/common/IconSvg'
import { side_navlinks } from '@/configs/default'

import style from './sidenavbar.module.scss'

const SideNavbar = React.memo(() => {
  return (
    <div className={style.sidenav_content}>
      <NavLink
        to="login"
        className={style.user}
      >
        <Icon name="user" />
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
