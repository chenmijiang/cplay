import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useCycle } from 'framer-motion'

import style from './navbar.module.scss'

function HeaderNavbar({ links }) {
  const [isOpen, toggleOpen] = useCycle(false, true)
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
        <motion.div
          className={style.menu_icon}
          animate={isOpen ? 'open' : 'closed'}
          onClick={() => toggleOpen()}
        >
          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            variants={{
              closed: {
                stroke: 'var(--bg-white-200)',
              },
              open: {
                stroke: 'var(--bg-white-100)',
              },
            }}
          >
            <Path
              variants={{
                closed: { d: 'M 3 4.5 L 27 4.5' },
                open: { d: 'M 4 26.5 L 26 3.5' },
              }}
            />
            <Path
              d="M 3 13.423 L 27 13.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <Path
              variants={{
                closed: { d: 'M 3 22.346 L 27 22.346' },
                open: { d: 'M 4 3.5 L 26 26.346' },
              }}
            />
          </motion.svg>
          <motion.div
            className={style.mini_nav_link}
            variants={{
              closed: { opacity: 0, x: 1000 },
              open: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.2, type: 'spring' }}
          >
            {/* 路由导航 */}
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={style.mini_link}
              >
                {link.detail}
              </NavLink>
            ))}
            <a
              className={style.mini_link}
              href="https://github.com/chenmijiang/cplay"
              target="_blank"
              rel="noreferrer"
            >
              项目地址
            </a>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  )
}

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    // stroke="var(--bg-white-200)"
    strokeLinecap="round"
    {...props}
  />
)

export default HeaderNavbar
