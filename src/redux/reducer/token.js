import { GET_TOKEN } from '../actions';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      token: action.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
