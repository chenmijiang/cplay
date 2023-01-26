import state from './state';
import playerReducer from "./playerReducer";
import * as playerActionCreator from './playerActionCreator'

const store = {
  state,
  reducer: playerReducer,
  actions: { ...playerActionCreator },
  asyncActions: {}
}

export default store