import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

import SideNavbar from './SideNavbar'
import MinimusicPlaybar from '@/components/MinimusicPlaybar'

import style from './personspace.module.scss'

const PersonSpace = () => {
  return (
    <motion.div
      className={style.personspace_page_body}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: 'easeInOut',
      }}
    >
      <div className={style.headerbar_body} />
      <div className={style.sidebar_body}>
        <SideNavbar />
      </div>
      <div className={style.playbar_body}>
        <MinimusicPlaybar />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </motion.div>
  )
}

export default PersonSpace
