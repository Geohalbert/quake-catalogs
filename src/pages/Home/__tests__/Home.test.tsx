import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Home } from '../Home';

describe('<Home />', () => {
  const tree = (props: object, actions: object) =>
    renderer
      .create(
        <MemoryRouter>
          {/*
            // @ts-ignore */}
          <Home {...props} {...actions} />
        </MemoryRouter>
      )
      .toJSON();

  it('should call fetchQuakesIfNeeded when componentDidMount', () => {
    const mockAction = jest.fn();
    const actions = { fetchQuakesIfNeeded: mockAction };

    mount(
      <MemoryRouter>
        {/*
          // @ts-ignore */}
        <Home {...actions} />
      </MemoryRouter>
    );

    expect(mockAction).toHaveBeenCalled();
  });

  it('renders the loading status if data invalid', () => {
    const props = { readyStatus: 'invalid' };
    const actions = { fetchQuakesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the loading status if requesting data', () => {
    const props = { readyStatus: 'request' };
    const actions = { fetchQuakesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders an error if loading failed', () => {
    const props = { readyStatus: 'failure' };
    const actions = { fetchQuakesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });

  it('renders the <QuakeList /> if loading was successful', () => {
    const props = {
      readyStatus: 'success',
      list: [{ id: '1', name: 'Welly' }]
    };
    const actions = { fetchQuakesIfNeeded: () => {} };

    expect(tree(props, actions)).toMatchSnapshot();
  });
});
