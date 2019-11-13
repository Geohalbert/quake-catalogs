import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchQuake } from '../quake';

const host = 'http://localhost';

axios.defaults.baseURL = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch quake data', () => {
  const quakeId = 'test';
  const response = {
    name: 'Welly',
    phone: '007',
    email: 'test@gmail.com',
    website: 'www.test.com'
  };
  const errorMessage = 'Request failed with status code 404';

  afterEach(() => {
    nock.disableNetConnect();
  });

  it('creates USER_SUCCESS when fetching quake has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: 'USER_REQUESTING', quakeId },
      { type: 'USER_SUCCESS', quakeId, data: response }
    ];
    const store = mockStore({ info: null });

    // @ts-ignore
    store.dispatch(fetchQuake('test', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates USER_FAILURE when fail to fetch quake', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'USER_REQUESTING', quakeId },
      { type: 'USER_FAILURE', quakeId, err: errorMessage }
    ];
    const store = mockStore({ err: null });

    // @ts-ignore
    store.dispatch(fetchQuake('test', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
