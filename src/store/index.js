/**
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { keyFob, keyFobFail, keyFobSuccess, keyFobInProgress } from './reducers/keyfob'
import { login, loginFail, loginSuccess, loginInProgress } from './reducers/login';
import { manual, manualFail, manualSuccess, manualInProgress } from './reducers/manual';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  keyFob, keyFobFail, keyFobSuccess, keyFobInProgress,
  login, loginFail, loginSuccess, loginInProgress,
  manual, manualFail, manualSuccess, manualInProgress
  //TODO: if necessary, use this to add reducers
});

// const logger = store => next => action => {
//   console.log("before");
//   next(action);
//   console.log("after");
// }

const middleware = [
  thunk
  // TODO: if necessary, use this to add middleware
];

const composer = __DEV__ ? composeWithDevTools : compose;
const store = createStore(reducers, composer(applyMiddleware(...middleware)));

export default store;

