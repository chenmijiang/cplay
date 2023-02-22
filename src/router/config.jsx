import React from 'react'

import HomePage from '@/views/HomePage'
import PersonSpace from '@/views/PersonSpace'

import LazyLoad from '@/components/common/LazyLoad'
import MessageInfo from '@/components/common/MessageInfo'

import { AuthorityLogin } from './authority'

const config = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/space',
    element: <PersonSpace />,
    caseSensitive: true,
    children: [
      {
        index: true,
        element: <MessageInfo />,
      },
      // {
      //   path: 'userinfo',
      //   element: (
      //     <Authority
      //       component={import(
      //         /* webpackChunkName:"space" */ '@/views/PersonSpace/UserInfo'
      //       )}
      //     />
      //   ),
      // },
      {
        path: 'login',
        element: (
          <AuthorityLogin
            component={import(
              /* webpackChunkName:"space" */ '@/views/PersonSpace/LoginQR'
            )}
          />
        ),
      },
      {
        path: 'search',
        element: (
          <LazyLoad
            component={import(
              /* webpackChunkName:"space" */ '@/views/PersonSpace/SearchPage'
            )}
          />
        ),
      },
      {
        path: 'history',
        element: (
          <LazyLoad
            component={import(
              /* webpackChunkName:"space" */ '@/views/PersonSpace/HistoryPage'
            )}
          />
        ),
      },
      {
        path: 'cloud',
        element: (
          <LazyLoad
            component={import(
              /* webpackChunkName:"space" */ '@/views/PersonSpace/CloudPage'
            )}
          />
        ),
      },
      {
        path: 'settings',
        element: (
          <LazyLoad
            component={import(
              /* webpackChunkName:"space" */ '@/views/PersonSpace/SettingsPage'
            )}
          />
        ),
      },
    ],
  },
  { path: '*', element: <LazyLoad component={import('@/views/NotFound')} /> },
]

export default config
