import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import home from './home';
import quakeInfo from './quakeInfo';

export default (history: History) =>
  combineReducers({
    // Register reducers here
    home,
    quakeInfo,
    router: connectRouter(history)
  });
