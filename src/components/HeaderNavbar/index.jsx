/** @format */

import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useCycle } from 'framer-motion'

import style from './navbar.module.scss'
import { backgroundVariants, buttonVariants, linkVariants, menuVariants } from './variants'

const NavlinkMotion = motion(NavLink)

const HeaderNavbar = React.memo(({ links }) => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  return (
    <nav>
      <div className={style.menu}>
        <p className={style.website_name}>Cplay 在线歌词编辑</p>
        <div className={style.menu_links}>
          {/* 路由导航 */}
          {links.map((link, index) => (
            <NavLink key={index} to={link.path} className={style.link}>
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
        <motion.div
          className={style.menu_icon}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          onClick={() => toggleOpen()}
        >
          <motion.svg width="30" height="30" viewBox="0 0 30 30" variants={buttonVariants}>
            <Path
              variants={{
                closed: { d: 'M 3 4.5 L 27 4.5' },
                open: { d: 'M 4 26.5 L 26 3.5' }
              }}
            />
            <Path
              d="M 3 13.423 L 27 13.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.1 }}
            />
            <Path
              variants={{
                closed: { d: 'M 3 22.346 L 27 22.346' },
                open: { d: 'M 4 3.5 L 26 26.346' }
              }}
            />
          </motion.svg>
          <motion.div className={style.mini_nav_background} variants={backgroundVariants} />
          <motion.div className={style.mini_links} variants={menuVariants}>
            {links.map((link, index) => (
              <NavlinkMotion
                variants={linkVariants}
                key={index}
                to={link.path}
                className={style.mini_link}
              >
                {link.detail}
              </NavlinkMotion>
            ))}
            <motion.a
              variants={linkVariants}
              className={style.mini_link}
              href="https://github.com/chenmijiang/cplay"
              target="_blank"
              rel="noreferrer"
            >
              项目地址
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  )
})

const Path = (props) => (
  <motion.path fill="transparent" strokeWidth="3" strokeLinecap="round" {...props} />
)

export default HeaderNavbar
