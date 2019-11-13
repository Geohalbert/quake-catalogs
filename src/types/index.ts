import { RouterState } from 'connected-react-router';
import { Action } from 'redux';
import { ThunkAction as Act, ThunkDispatch as Dispatch } from 'redux-thunk';

// Reducers
export interface HomeState {
  readyStatus: string;
  err: any;
  list: Array<{ id: string; name: string }>;
}

export interface QuakeInfoState {
  [quakeId: string]: {
    readyStatus: string;
    err: any;
    info: {
      name: string;
      phone: string;
      email: string;
      website: string;
    };
  };
}

export interface AppState {
  home: HomeState;
  quakeInfo: QuakeInfoState;
  router: RouterState;
}

export type ThunkState = () => AppState;

// Actions
export const QUAKES_REQUESTING = 'QUAKES_REQUESTING';
export const QUAKES_SUCCESS = 'QUAKES_SUCCESS';
export const QUAKES_FAILURE = 'QUAKES_FAILURE';

export const QUAKE_REQUESTING = 'QUAKE_REQUESTING';
export const QUAKE_SUCCESS = 'QUAKE_SUCCESS';
export const QUAKE_FAILURE = 'QUAKE_FAILURE';

export interface QuakesAction {
  type:
    | typeof QUAKES_REQUESTING
    | typeof QUAKES_SUCCESS
    | typeof QUAKES_FAILURE;
  data?: Array<object>;
  err?: any;
}

export interface QuakeAction {
  type: typeof QUAKE_REQUESTING | typeof QUAKE_SUCCESS | typeof QUAKE_FAILURE;
  quakeId: string;
  data?: object;
  err?: any;
}

export type MyAction = QuakesAction | QuakeAction;

export type ThunkAction = Act<void, AppState, null, Action<string>>;

export type ThunkDispatch = Dispatch<AppState, void, MyAction>;
