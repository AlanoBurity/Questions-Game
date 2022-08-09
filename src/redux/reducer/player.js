import { SAVE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: 'Sign in',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.user,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default player;
