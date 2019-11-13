import axios from 'axios';

import {
  ThunkDispatch,
  ThunkState,
  ThunkAction,
  AppState,
  USERS_REQUESTING,
  USERS_SUCCESS,
  USERS_FAILURE
} from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/quakes';

// Export this for unit testing
/* istanbul ignore next */
export const fetchQuakes = (URL: string = API_URL): ThunkAction => async (
  dispatch: ThunkDispatch
) => {
  dispatch({ type: USERS_REQUESTING });

  try {
    const { data } = await axios.get(URL);

    /* istanbul ignore next */
    dispatch({ type: USERS_SUCCESS, data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: USERS_FAILURE, err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchQuakes = (state: AppState): boolean => {
  if (state.home.readyStatus === 'success') return false;

  return true;
};

/* istanbul ignore next */
export const fetchQuakesIfNeeded = (): ThunkAction => (
  dispatch: ThunkDispatch,
  getState: ThunkState
) => {
  /* istanbul ignore next */
  if (shouldFetchQuakes(getState())) return dispatch(fetchQuakes());

  /* istanbul ignore next */
  return null;
};
