import React, { useState } from 'react';
import { TaxComputationForm } from './TaxComputationForm/TaxComputationForm';
import { TaxResult } from './TaxResult/TaxResult';
import { FilterableSliceTable } from './FilterableSliceTable/FilterableSliceTable';
import './Home.css';
import { TaxResultHistory } from 'pages/Home/TaxResultHistory/TaxResultHistory';

const Home = () => {
  const [taxRate, taxRateSetter] = useState(0);
  const [taxAmount, taxAmountSetter] = useState(0);
  const [numberOfShares, numberOfSharesSetter] = useState(0);

  return (
    <>
      <div className="tax-calculation">
        <div className="tax-calculation_content">
          <TaxComputationForm
            taxRateSetter={taxRateSetter}
            taxAmountSetter={taxAmountSetter}
            numberOfSharesSetter={numberOfSharesSetter}
          />

          <TaxResult
            taxRate={taxRate}
            taxAmount={taxAmount}
            numberOfShares={numberOfShares}
          />

          <TaxResultHistory />
        </div>

        <aside className="tax-calculation_maximum-ceiling">
          <FilterableSliceTable />
        </aside>
      </div>
    </>
  );
};

export default Home;
