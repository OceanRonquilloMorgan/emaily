// Wiring up surveys to Redux
import { FETCH_SURVEYS } from '../actions/types';

// reducer boilerplate
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
