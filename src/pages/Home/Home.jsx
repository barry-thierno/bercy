import React from 'react';
import { FilterableSliceTable } from './FilterableSliceTable/FilterableSliceTable';
import './Home.css';

const Home = () => (
  <>
    <div className="tax-calculation">
      <div className="tax-calculation_content">
        <div>Formulaire</div>
      </div>

      <aside className="tax-calculation_maximum-ceiling">
        <FilterableSliceTable />
      </aside>
    </div>
  </>
);

export default Home;
