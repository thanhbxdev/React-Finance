import { AnyAction, combineReducers } from 'redux';

import authReducer, { AuthReducer } from './auth.reducer';
import sourceReducer, { SourceReducer } from './source.reducer';
import categoryReducer, { CategoryReducer } from './category.reducer';
import streamReducer, { StreamReducer } from './stream.reducer';
import timeReducer, { TimeReducer } from './time.reducer';

export interface AppReducer {
  auth: AuthReducer;
  source: SourceReducer;
  category: CategoryReducer;
  stream: StreamReducer;
  time: TimeReducer;
}

const appReducer = combineReducers({
  auth: authReducer,
  source: sourceReducer,
  category: categoryReducer,
  stream: streamReducer,
  time: timeReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  // if (action.type === AUTH_TYPES.LOGOUT) {
  //   return appReducer(undefined, action);
  // }
  return appReducer(state, action);
};

export default rootReducer;

export class setMonth {}
