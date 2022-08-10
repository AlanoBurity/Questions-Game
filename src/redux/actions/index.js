export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const CLEAR_STATE = 'CLEAR_STATE';

export const saveUser = (user, email) => ({
  type: SAVE_PLAYER,
  user,
  email,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await request.json();
    dispatch(getToken(result.token));
    localStorage.setItem('token', result.token);
  } catch (error) {
    console.log(error);
  }
};

export const saveScoreState = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const clearState = () => ({
  type: CLEAR_STATE,
});
