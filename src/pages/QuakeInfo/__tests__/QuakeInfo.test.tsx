import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { QuakeInfo } from '../QuakeInfo';

describe('<QuakeInfo />', () => {
  const tree = (props: object, actions: object) =>
    renderer
      .create(
        <MemoryRouter>
          {/*
            // @ts-ignore */}
          <QuakeInfo {...props} {...actions} />
        </MemoryRouter>
      )
      .toJSON();

  it('should call fetchQuakeIfNeeded when componentDidMount', () => {
    const mockAction = jest.fn();
    const props = {
      quakeInfo: {},
      match: { params: { id: 1 } }
    };
    const actions = { fetchQuakeIfNeeded: mockAction };

    mount(
      <MemoryRouter>
        <QuakeInfo {...props} {...actions} />
      </MemoryRouter>
    );

    expect(mockAction).toHaveBeenCalled();
  });

  it('renders the loading status if data invalid', () => {
    const props = {
      quakeInfo: {},
      match: { params: { id: 1 } }
    };
    const actions = { fetchQuakeIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if requesting data', () => {
    const props = {
      quakeInfo: { 1: { readyStatus: 'request' } },
      match: { params: { id: 1 } }
    };
    const actions = { fetchQuakeIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders an error if loading failed', () => {
    const props = {
      quakeInfo: { 1: { readyStatus: 'failure' } },
      match: { params: { id: 1 } }
    };
    const actions = { fetchQuakeIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the <QuakeCard /> if loading was successful', () => {
    const props = {
      quakeInfo: {
        1: {
          readyStatus: 'success',
          info: {
            name: 'Welly',
            phone: '007',
            email: 'test@gmail.com',
            website: 'www.test.com'
          }
        }
      },
      match: { params: { id: 1 } }
    };
    const actions = { fetchQuakeIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
