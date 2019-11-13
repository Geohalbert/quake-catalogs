import axios from 'axios';

import {
  ThunkDispatch,
  ThunkState,
  ThunkAction,
  AppState,
  QUAKE_REQUESTING,
  QUAKE_SUCCESS,
  QUAKE_FAILURE
} from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/quakes';

// Export this for unit testing
/* istanbul ignore next */
export const fetchQuake = (
  quakeId: string,
  URL: string = API_URL
): ThunkAction => async (dispatch: ThunkDispatch) => {
  dispatch({ type: QUAKE_REQUESTING, quakeId });

  try {
    const { data } = await axios.get(`${URL}/${quakeId}`);

    /* istanbul ignore next */
    dispatch({ type: QUAKE_SUCCESS, quakeId, data });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: QUAKE_FAILURE, quakeId, err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchQuake = (state: AppState, quakeId: string): boolean => {
  const quakeInfo = state.quakeInfo[quakeId];

  if (quakeInfo && quakeInfo.readyStatus === 'success') return false;

  return true;
};

/* istanbul ignore next */
export const fetchQuakeIfNeeded = (quakeId: string): ThunkAction => (
  dispatch: ThunkDispatch,
  getState: ThunkState
) => {
  /* istanbul ignore next */
  if (shouldFetchQuake(getState(), quakeId))
    return dispatch(fetchQuake(quakeId));

  /* istanbul ignore next */
  return null;
};
