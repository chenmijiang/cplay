import React from 'react'
import { NavLink } from 'react-router-dom'

// import SearchIcon from '@/assets/svg/searchIcon.svg'
import Icon from '@/components/IconSvg'
import style from './sidenavbar.module.scss'

const side_navlink = [
  { id: 'search', icon: undefined, name: '搜索' },
  { id: 'history', icon: undefined, name: '历史' },
  { id: 'cloud', icon: undefined, name: '云盘' },
  { id: 'settings', icon: undefined, name: '设置' },
]

const SideNavbar = () => {
  return (
    <div className={style.sidenav_content}>
      <div className={style.user}>
        <Icon name="search" />
      </div>
      {side_navlink.map((link) => (
        <div key={link.id}>
          <NavLink to={link.id}>
            {link.name} - {link.icon}
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default SideNavbar
