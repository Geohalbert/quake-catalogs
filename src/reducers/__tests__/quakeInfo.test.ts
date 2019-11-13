import quakeInfo from '../quakeInfo';

describe('quake data quakeInfo', () => {
  it('should handle the initial state', () => {
    // @ts-ignore
    expect(quakeInfo(undefined, {})).toEqual({});
  });

  it('should handle QUAKE_REQUESTING', () => {
    expect(
      quakeInfo(undefined, {
        type: 'QUAKE_REQUESTING',
        quakeId: '1'
      })
    ).toEqual({ 1: { readyStatus: 'request' } });
  });

  it('should handle QUAKE_FAILURE', () => {
    expect(
      quakeInfo(undefined, {
        type: 'QUAKE_FAILURE',
        quakeId: '1',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      1: {
        readyStatus: 'failure',
        err: 'Oops! Something went wrong.'
      }
    });
  });

  it('should handle QUAKE_SUCCESS', () => {
    expect(
      quakeInfo(undefined, {
        type: 'QUAKE_SUCCESS',
        quakeId: '1',
        data: {
          name: 'Welly',
          phone: '007',
          email: 'test@gmail.com',
          website: 'www.test.com'
        }
      })
    ).toEqual({
      1: {
        readyStatus: 'success',
        info: {
          name: 'Welly',
          phone: '007',
          email: 'test@gmail.com',
          website: 'www.test.com'
        }
      }
    });
  });
});
