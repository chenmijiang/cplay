import React from 'react'
import { NavLink } from 'react-router-dom'

import Style from '../assets/scss/navbar.module.scss'

function Navbar(props) {
  let {
    links,
    /* state */
    /* dispatch */
  } = props

  return (
    <nav>
      <div className={Style.menu}>
        <p className={Style.website_name}>Cplay 在线歌词编辑</p>
        <div className={Style.menu_links}>
          {links.map((link, index) => (
            <NavLink key={index} to={link.path} className={Style.link}>
              {link.detail}
            </NavLink>
          ))}
          <a
            className={Style.link}
            href="https://github.com/Your-songs-are-so-good/cplay"
            target="_blank"
            rel="noreferrer"
          >
            项目地址
          </a>
        </div>
        <div className={Style.menu_icon}>
          <span className={Style.icon}></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
