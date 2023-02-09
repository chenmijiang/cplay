import state from './state';
import uploadFilesReducer from './uploadFilesReducer';
import * as uploadActionCreator from './uploadActionCreator';
import * as uploadAsyncActionCreator from './uploadAsyncActionCreator';

const store = {
  state,
  reducer: uploadFilesReducer,
  actions: { ...uploadActionCreator },
  asyncActions: { ...uploadAsyncActionCreator }
}

export default store