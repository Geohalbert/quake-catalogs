import {
  QuakeInfoState,
  QuakeAction,
  QUAKE_REQUESTING,
  QUAKE_SUCCESS,
  QUAKE_FAILURE
} from '../types';

export default (state: QuakeInfoState = {}, action: QuakeAction) => {
  switch (action.type) {
    case QUAKE_REQUESTING:
      return {
        ...state,
        [action.quakeId]: {
          readyStatus: 'request'
        }
      };
    case QUAKE_SUCCESS:
      return {
        ...state,
        [action.quakeId]: {
          readyStatus: 'success',
          info: action.data
        }
      };
    case QUAKE_FAILURE:
      return {
        ...state,
        [action.quakeId]: {
          readyStatus: 'failure',
          err: action.err
        }
      };
    default:
      return state;
  }
};
