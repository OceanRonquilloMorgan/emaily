import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

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

// submit survey after SurveyFormReview is finished
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  //redirect user
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// network request to backend to return surveys;
// new reducer to catch data
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
