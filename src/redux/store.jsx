import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'

import {
  loginReducer,
  playerReducer,
  lyricsEditReducer,
  uploadFilesReducer,
} from './reducers'
import { initState } from './initState'

const reducer = combineReducers({
  login: loginReducer,
  player: playerReducer,
  lyricsEdit: lyricsEditReducer,
  uploadFiles: uploadFilesReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initState,
  composeEnhancers(applyMiddleware(reduxPromise))
)

export default store
