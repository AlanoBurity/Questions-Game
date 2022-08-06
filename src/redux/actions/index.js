export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_USER = 'SAVE_USER';

export const saveUser = (user, email) => ({
  type: SAVE_USER,
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
