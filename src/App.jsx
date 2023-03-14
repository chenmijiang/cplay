/** @format */

import { HashRouter as Router } from 'react-router-dom'

import DefaultRoutes from '@/router'
import MusicPlayer from '@/components/MusicPlayer'
import HeaderNavbar from '@/components/HeaderNavbar'

import { navbar_links } from '@/configs/default'
import Toast from '@/components/common/Toast'
import useInit from '@/hooks/useInit'

function App() {
  useInit()
  return (
    <Router>
      <MusicPlayer />
      <HeaderNavbar links={navbar_links} />
      <DefaultRoutes />
      <Toast />
    </Router>
  )
}

export default App
