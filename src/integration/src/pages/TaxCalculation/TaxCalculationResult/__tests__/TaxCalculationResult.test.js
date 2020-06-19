import React from 'react';
import { render } from '@testing-library/react';
import { TaxCalculationResult } from '../TaxCalculationResult';

describe('TaxCalculationResultResult', () => {
  it('Renders TaxCalculationResult component without crashing', () => {
    const { asFragment } = render(<TaxCalculationResult />);
    expect(asFragment()).toMatchSnapshot();
  });
});
