import state from './state';
import searchReducer from './searchReducer';
import * as searchActionCreator from './searchActionCreator';
import * as searchAsyncActionCreator from './searchAsyncActionCreator';

const store = {
  state,
  reducer: searchReducer,
  actions: { ...searchActionCreator },
  asyncActions: { ...searchAsyncActionCreator }
}

export default store