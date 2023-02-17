import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import DefaultRoutes from '@/router'
import MusicPlayer from '@/components/MusicPlayer'
import HeaderNavbar from '@/components/HeaderNavbar'

import { navbar_links } from '@/configs/default'
import Toast from '@/components/common/Toast'
import { setBaseUrl } from '@/apis'

function App() {
  const baseUrl = useSelector((state) => state.setting.baseUrl)
  useEffect(() => {
    if (baseUrl) {
      setBaseUrl(baseUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
