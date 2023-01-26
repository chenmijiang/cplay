import state from './state';
import lyricsEditReducer from "./lyricsEditReducer";
import * as lyricsEditActionCreator from "./lyricsEditActionCreator";

const store = {
  state,
  reducer: lyricsEditReducer,
  actions: { ...lyricsEditActionCreator },
  asyncActions: {}
}

export default store
