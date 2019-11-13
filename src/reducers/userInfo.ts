import {
  QuakeInfoState,
  QuakeAction,
  USER_REQUESTING,
  USER_SUCCESS,
  USER_FAILURE
} from '../types';

export default (state: QuakeInfoState = {}, action: QuakeAction) => {
  switch (action.type) {
    case USER_REQUESTING:
      return {
        ...state,
        [action.quakeId]: {
          readyStatus: 'request'
        }
      };
    case USER_SUCCESS:
      return {
        ...state,
        [action.quakeId]: {
          readyStatus: 'success',
          info: action.data
        }
      };
    case USER_FAILURE:
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
