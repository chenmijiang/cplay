import { useRoutes } from 'react-router-dom'

import HomePage from '../views/HomePage'
import UploadPage from '../views/UploadPage'
import NotFound from '../views/NotFound'

function MRouter() {
  const element = useRoutes([
    {
      path: '/upload',
      element: <UploadPage></UploadPage>,
    },
    {
      path: '/',
      element: <HomePage></HomePage>,
    },
    {
      path: '*',
      element: <NotFound></NotFound>,
    },
  ])
  return element
}

export default MRouter
