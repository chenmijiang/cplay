import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {
  playerReducer,
  lyricsEditReducer,
  uploadFilesReducer,
} from './reducers'
import { initState } from './initState'

const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume'],
}

const reducer = combineReducers({
  player: persistReducer(playerPersistConfig, playerReducer),
  lyricsEdit: lyricsEditReducer,
  uploadFiles: uploadFilesReducer,
})

let store = createStore(
  reducer,
  initState,
  // redux 插件：https://github.com/zalmoxisus/redux-devtools-extension#usage
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
let persistor = persistStore(store)

export { store, persistor }
