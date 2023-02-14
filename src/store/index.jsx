import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunkMiddleware from './middleware'

import lyrics from './lyrics'
import player from './player'
import upload from './upload'
import searchReducer from './search.slice'
import userReducer from './user.slice'

const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume'],
}

const initState = {
  lyricsEdit: { ...lyrics.state },
  player: { ...player.state },
  uploadFiles: { ...upload.state },
}

let store = configureStore({
  reducer: {
    player: persistReducer(playerPersistConfig, player.reducer),
    lyricsEdit: lyrics.reducer,
    uploadFiles: upload.reducer,
    search: persistReducer(
      {
        key: 'search',
        storage,
        whitelist: ['history', 'songsCache', 'songCount'],
      },
      searchReducer
    ),
    user: persistReducer(
      { key: 'profile', storage, whitelist: ['profile'] },
      userReducer
    ),
  },
  preloadedState: initState,
  middleware: [thunkMiddleware],
  // devTools: false,
})

let persistor = persistStore(store)

export { store, persistor }
