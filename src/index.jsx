/** @format */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import 'reset-css'
import '@/assets/scss/index.scss'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { isMobile } from '@/utils/common'

import App from './App'
import reportWebVitals from './reportWebVitals'
import LazyLoad from './components/common/LazyLoad'

const root = ReactDOM.createRoot(document.getElementById('root'))
// 白屏加载动画
// const loadingContainer = document.getElementById('loading')
// if (loadingContainer) {
//   loadingContainer.remove()
// }
root.render(
  <>
    {isMobile() === true ? (
      <LazyLoad component={import(/* webpackChunkName:"mobile" */ './Mobile')} />
    ) : (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )}
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
