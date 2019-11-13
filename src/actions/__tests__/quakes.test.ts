import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchQuakes } from '../quakes';

const host = 'http://localhost';

axios.defaults.baseURL = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch quakes data', () => {
  const response = [{ id: 'test', name: 'Welly' }];
  const errorMessage = 'Request failed with status code 404';

  afterEach(() => {
    nock.disableNetConnect();
  });

  it('creates QUAKES_SUCCESS when fetching quakes has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: 'QUAKES_REQUESTING' },
      { type: 'QUAKES_SUCCESS', data: response }
    ];
    const store = mockStore({ list: null });

    // @ts-ignore
    store.dispatch(fetchQuakes(`${host}/test`)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates QUAKES_FAILURE when fail to fetch quakes', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'QUAKES_REQUESTING' },
      { type: 'QUAKES_FAILURE', err: errorMessage }
    ];
    const store = mockStore({ err: null });

    // @ts-ignore
    store.dispatch(fetchQuakes(`${host}/test`)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
