import axios from 'axios';
import { FETCH_USER } from './types';

// refactored action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// handle stripe payments to keep track of current tokens
export const handleToken = token => async dispatch => {
  // make POST request to backend server
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
