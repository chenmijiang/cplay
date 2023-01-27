import { HashRouter as Router } from 'react-router-dom'

import DefaultRoutes from '@/router'
import MusicPlayer from '@/components/MusicPlayer'
import HeaderNavbar from '@/components/HeaderNavbar'

import { navbar_links } from '@/configs/default'

function App() {
  return (
    <Router>
      <MusicPlayer />
      <HeaderNavbar links={navbar_links} />
      <DefaultRoutes />
    </Router>
  )
}

export default App
