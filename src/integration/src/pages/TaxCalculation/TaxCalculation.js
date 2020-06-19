import React from 'react';
import { TaxCalculationForm } from 'pages/TaxCalculation/TaxCalculationForm/TaxCalculationForm';
import { TaxCalculationResult } from 'pages/TaxCalculation/TaxCalculationResult/TaxCalculationResult';
import { MaximumCeiling } from 'pages/TaxCalculation/MaximumCeiling/MaximumCeiling';

import './TaxCalculation.scss';

export const TaxCalculation = () => (
  <div className="container">
    <div className="tax-calculation">
      <form className="af-form tax-form">
        <TaxCalculationForm />
        <TaxCalculationResult />
      </form>
      <div className="maximum-ceiling">
        <MaximumCeiling />
      </div>
    </div>
  </div>
);
