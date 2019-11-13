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

function today() {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}
// const API_URL = 'https://jsonplaceholder.typicode.com/users';
const API_URL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-11-12&endtime=2019-11-13&limit=10`;
// Export this for unit testing
/* istanbul ignore next */
export const fetchQuake = (
  // userId: string,
  quakeId: string,
  URL: string = API_URL
): ThunkAction => async (dispatch: ThunkDispatch) => {
  // dispatch({ type: QUAKE_REQUESTING, userId });
  dispatch({ type: QUAKE_REQUESTING, quakeId });
  try {
    // const { data } = await axios.get(`${URL}/${userId}`);
    const { data } = await axios.get(`${URL}&eventId=${quakeId}`);

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
