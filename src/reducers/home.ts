import {
  HomeState,
  QuakesAction,
  QUAKES_REQUESTING,
  QUAKES_SUCCESS,
  QUAKES_FAILURE
} from '../types';

const initialState: HomeState = {
  readyStatus: 'invalid',
  err: null,
  list: []
};

export default (state = initialState, action: QuakesAction) => {
  switch (action.type) {
    case QUAKES_REQUESTING:
      return {
        ...state,
        readyStatus: 'request'
      };
    case QUAKES_SUCCESS:
      return {
        ...state,
        readyStatus: 'success',
        list: action.data
      };
    case QUAKES_FAILURE:
      return {
        ...state,
        readyStatus: 'failure',
        err: action.err
      };
    default:
      return state;
  }
};
