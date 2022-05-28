import { BrowserRouter as Router } from 'react-router-dom'

import IndexRoutes from './router/index'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Navbar from './components/Navbar'

import config from './configs/config.default'

function App() {
  return (
    <Router>
      <MusicPlayer></MusicPlayer>
      <Navbar links={config.navbar_links}></Navbar>
      <IndexRoutes></IndexRoutes>
    </Router>
  )
}

export default App
