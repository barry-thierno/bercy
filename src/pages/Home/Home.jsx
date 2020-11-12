import React from 'react';
import { TaxComputationForm } from './TaxComputationForm/TaxComputationForm';
import { FilterableSliceTable } from './FilterableSliceTable/FilterableSliceTable';
import './Home.css';

const Home = () => (
  <>
    <div className="tax-calculation">
      <div className="tax-calculation_content">
        <TaxComputationForm />
      </div>

      <aside className="tax-calculation_maximum-ceiling">
        <FilterableSliceTable />
      </aside>
    </div>
  </>
);

export default Home;
