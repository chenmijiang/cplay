import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { showLoginBox, logout } from '../redux/actions/loginActionCreator'
import { playPause } from '../redux/actions/playerActionCreator'

import Style from '../assets/scss/navbar.module.scss'

function Navbar(props) {
  let {
    links,
    /* state */
    // userId,
    // nickname,
    // avatarUrl,
    user,
    /* dispatch */
    showLoginBox,
    playPause,
    logout,
  } = props

  // const [userPic, setUserPic] = useState('')

  // let image = new Image()
  // image.src = avatarUrl
  // image.onload
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
          {!user.nickname ? (
            <button
              className={[Style.button, Style.link].join(' ')}
              onClick={() => {
                showLoginBox(true)
                playPause(true)
              }}
            >
              登录
            </button>
          ) : (
            <span className={Style.user_info}>
              <img
                src={user.avatarUrl}
                alt={user.nickname}
                title={user.nickname}
                onClick={logout}
              />
            </span>
          )}
        </div>
        <div className={Style.menu_icon}>
          <span className={Style.icon}></span>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    // userId: state.login.user.userId,
    // nickname: state.login.user.nickname,
    // avatarUrl: state.login.user.avatarUrl,
    user: state.login.user,
  }
}

const mapDispathToProps = {
  showLoginBox,
  playPause,
  logout,
}

export default connect(mapStateToProps, mapDispathToProps)(Navbar)
