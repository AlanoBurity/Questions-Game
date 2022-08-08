import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  user: 'Sign in',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      user: action.user,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
