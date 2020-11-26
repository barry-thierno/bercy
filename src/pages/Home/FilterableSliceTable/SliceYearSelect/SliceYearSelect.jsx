import React from 'react';
import { SelectBase } from '@axa-fr/react-toolkit-all';

export const SliceYearSelect = ({ selectedYear, setSelectedYear }) => {
  return (
    <>
      <span className="af-panel__title">Taux d'imposition par année</span>
      <SelectBase
        key="key"
        name="name"
        options={[
          { value: '2019', label: '2019' },
          { value: '2020', label: '2020' },
        ]}
        value={selectedYear}
        onChange={({ value }) => setSelectedYear(value)}
      />
    </>
  );
};
