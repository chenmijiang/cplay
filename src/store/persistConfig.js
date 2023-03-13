/** @format */

import storage from 'redux-persist/lib/storage'
// defaults to localStorage for web

export const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume']
}

export const searchPersistConfig = {
  key: 'search',
  storage,
  whitelist: ['history', 'songsCache']
}

export const profilePersistConfig = {
  key: 'profile',
  storage,
  whitelist: ['profile']
}

export const settingPersistConfig = {
  key: 'setting',
  storage,
  whitelist: ['quality', 'baseUrl', 'animationTime']
}

export const historyPersistConfig = {
  key: 'history',
  storage
}

export const cloudPersistConfig = {
  key: 'cloud',
  storage,
  whitelist: ['cloudList', 'lastUploadTime']
}
