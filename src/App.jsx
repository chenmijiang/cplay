import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import IndexRoutes from './router/index'
import LoginBox from './components/LoginBox'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Navbar from './components/Navbar'

import { getUserInfo } from './redux/actions/loginActionCreator'

import config from './configs/config.default'

function App(props) {
  props.getUserInfo()

  return (
    <Router>
      <LoginBox></LoginBox>
      <MusicPlayer></MusicPlayer>
      <Navbar links={config.navbar_links}></Navbar>
      <IndexRoutes></IndexRoutes>
    </Router>
  )
}

const mapDispatchToProps = {
  getUserInfo,
}

export default connect(null, mapDispatchToProps)(App)
