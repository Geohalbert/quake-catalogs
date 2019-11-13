import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import QuakeCard from '../index';

describe('<QuakeCard />', () => {
  it('renders', () => {
    const mockData = {
      name: 'Welly',
      phone: '007',
      email: 'test@gmail.com',
      website: 'www.test.com'
    };
    const tree = renderer
      .create(
        <MemoryRouter>
          <QuakeCard info={mockData} />
        </MemoryRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
