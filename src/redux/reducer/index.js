import { combineReducers } from 'redux';
import tokenReducer from './token';

const rootReducer = combineReducers({ tokenReducer });

export default rootReducer;
