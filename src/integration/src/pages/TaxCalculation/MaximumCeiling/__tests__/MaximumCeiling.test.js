import React from 'react';
import { render } from '@testing-library/react';
import { MaximumCeiling } from '../MaximumCeiling';

describe('MaximumCeiling', () => {
  it('Renders MaximumCeiling component without crashing', () => {
    const { asFragment } = render(<MaximumCeiling />);
    expect(asFragment()).toMatchSnapshot();
  });
});
