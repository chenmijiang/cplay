import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import lyrics from './lyrics'
import player from './player'
import upload from './upload'

const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume'],
}

const reducer = combineReducers({
  player: persistReducer(playerPersistConfig, player.reducer),
  lyricsEdit: lyrics.reducer,
  uploadFiles: upload.reducer,
})

const initState = {
  lyricsEdit: { ...lyrics.state },
  player: { ...player.state },
  uploadFiles: { ...upload.state },
}

let store = configureStore({
  reducer,
  preloadedState: initState,
  // redux 插件：https://github.com/zalmoxisus/redux-devtools-extension#usage
  // devTools: true,
})

let persistor = persistStore(store)

export { store, persistor }
