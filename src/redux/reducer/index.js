import { combineReducers } from 'redux';
import tokenReducer from './token';
import player from './player';

const rootReducer = combineReducers({ tokenReducer,
  player });

export default rootReducer;
