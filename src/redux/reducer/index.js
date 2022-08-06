import { combineReducers } from 'redux';
import tokenReducer from './token';
import userReducer from './user';

const rootReducer = combineReducers({ tokenReducer, userReducer });

export default rootReducer;
