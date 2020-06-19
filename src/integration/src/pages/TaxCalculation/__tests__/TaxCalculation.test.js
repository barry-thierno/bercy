import React from 'react';
import { render } from '@testing-library/react';
import { TaxCalculation } from '../TaxCalculation';

describe('TaxCalculation', () => {
  it('Renders TaxCalculation component without crashing', () => {
    const { asFragment } = render(<TaxCalculation />);
    expect(asFragment()).toMatchSnapshot();
  });
});
