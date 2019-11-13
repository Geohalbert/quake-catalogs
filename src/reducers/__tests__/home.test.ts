import home from '../home';

describe('quakes data home', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(home(undefined, {})).toEqual({
      readyStatus: 'invalid',
      err: null,
      list: []
    });
  });

  it('should handle QUAKES_REQUESTING', () => {
    expect(
      home(undefined, {
        type: 'QUAKES_REQUESTING',
        err: null,
        data: []
      })
    ).toEqual({
      readyStatus: 'request',
      err: null,
      list: []
    });
  });

  it('should handle QUAKES_FAILURE', () => {
    expect(
      home(undefined, {
        type: 'QUAKES_FAILURE',
        err: 'Oops! Something went wrong.',
        data: []
      })
    ).toEqual({
      readyStatus: 'failure',
      err: 'Oops! Something went wrong.',
      list: []
    });
  });

  it('should handle QUAKES_SUCCESS', () => {
    expect(
      home(undefined, {
        type: 'QUAKES_SUCCESS',
        err: null,
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'success',
      err: null,
      list: [{ id: '1', name: 'Welly' }]
    });
  });
});
