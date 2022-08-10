import { SAVE_PLAYER, SAVE_SCORE } from '../actions';

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
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
