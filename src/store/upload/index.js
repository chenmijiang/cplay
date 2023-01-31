import state from './state';
import uploadFilesReducer from './uploadFilesReducer';
import * as uploadActionCreator from './uploadActionCreator';

const store = {
  state,
  reducer: uploadFilesReducer,
  actions: { ...uploadActionCreator },
  asyncActions: {}
}

export default store