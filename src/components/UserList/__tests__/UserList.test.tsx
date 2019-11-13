import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import QuakeList from '../index';

describe('<QuakeList />', () => {
  it('renders', () => {
    const mockData = [{ id: '1', name: 'Welly' }];
    const tree = renderer
      .create(
        <MemoryRouter>
          <QuakeList list={mockData} />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
