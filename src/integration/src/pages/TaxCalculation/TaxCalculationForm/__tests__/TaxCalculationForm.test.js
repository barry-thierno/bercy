import React from 'react';
import { render } from '@testing-library/react';
import { TaxCalculationForm } from '../TaxCalculationForm';

describe('TaxCalculationFormForm', () => {
  it('Renders TaxCalculationForm component without crashing', () => {
    const { asFragment } = render(<TaxCalculationForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
