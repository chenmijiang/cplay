import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './navbar.module.scss'

function HeaderNavbar({ links }) {
  return (
    <nav>
      <div className={style.menu}>
        <p className={style.website_name}>Cplay 在线歌词编辑</p>
        <div className={style.menu_links}>
          {/* 路由导航 */}
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={style.link}
            >
              {link.detail}
            </NavLink>
          ))}
          <a
            className={style.link}
            href="https://github.com/chenmijiang/cplay"
            target="_blank"
            rel="noreferrer"
          >
            项目地址
          </a>
        </div>
        <div className={style.menu_icon}>
          <span className={style.icon}></span>
        </div>
      </div>
    </nav>
  )
}

export default HeaderNavbar
