import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'

import lyricsReducer from './lyrics.slice'
import playReducer from './play.slice'
import uploadReducer from './upload.slice'
import searchReducer from './search.slice'
import userReducer from './user.slice'
import settingReducer from './setting.slice'
import toastReducer from './toast.slice'
import historyReducer from './history.slice'

import {
  historyPersistConfig,
  playerPersistConfig,
  profilePersistConfig,
  searchPersistConfig,
  settingPersistConfig,
} from './persistConfig'

let store = configureStore({
  preloadedState: {},
  reducer: {
    player: persistReducer(playerPersistConfig, playReducer),
    lyricsEdit: lyricsReducer,
    uploadFiles: uploadReducer,
    search: persistReducer(searchPersistConfig, searchReducer),
    user: persistReducer(profilePersistConfig, userReducer),
    setting: persistReducer(settingPersistConfig, settingReducer),
    toast: toastReducer,
    history: persistReducer(historyPersistConfig, historyReducer),
  },
  devTools: process.env.NODE_ENV === 'production' ? false : true,
})

let persistor = persistStore(store)

export { store, persistor }
