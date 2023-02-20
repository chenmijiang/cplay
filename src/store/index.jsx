import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import lyricsReducer from './lyrics.slice'
import playReducer from './play.slice'
import uploadReducer from './upload.slice'
import searchReducer from './search.slice'
import userReducer from './user.slice'
import settingReducer from './setting.slice'
import toastReducer from './toast.slice'

const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume'],
}

let store = configureStore({
  preloadedState: {},
  reducer: {
    player: persistReducer(playerPersistConfig, playReducer),
    lyricsEdit: lyricsReducer,
    uploadFiles: uploadReducer,
    search: persistReducer(
      {
        key: 'search',
        storage,
        whitelist: ['history', 'songsCache'],
      },
      searchReducer
    ),
    user: persistReducer(
      { key: 'profile', storage, whitelist: ['profile'] },
      userReducer
    ),
    setting: persistReducer(
      {
        key: 'setting',
        storage,
        whitelist: ['quality', 'baseUrl', 'animationTime'],
      },
      settingReducer
    ),
    toast: toastReducer,
  },
  // devTools: false,
})

let persistor = persistStore(store)

export { store, persistor }
