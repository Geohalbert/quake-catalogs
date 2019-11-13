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
export const USERS_REQUESTING = 'USERS_REQUESTING';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

export const USER_REQUESTING = 'USER_REQUESTING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export interface QuakesAction {
  type: typeof USERS_REQUESTING | typeof USERS_SUCCESS | typeof USERS_FAILURE;
  data?: Array<object>;
  err?: any;
}

export interface QuakeAction {
  type: typeof USER_REQUESTING | typeof USER_SUCCESS | typeof USER_FAILURE;
  quakeId: string;
  data?: object;
  err?: any;
}

export type MyAction = QuakesAction | QuakeAction;

export type ThunkAction = Act<void, AppState, null, Action<string>>;

export type ThunkDispatch = Dispatch<AppState, void, MyAction>;
