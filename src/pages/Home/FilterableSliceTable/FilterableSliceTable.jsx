import React, { useState, useEffect } from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import { SliceYearSelect } from 'pages/Home/FilterableSliceTable/SliceYearSelect/SliceYearSelect';
import { SliceTableHeader } from 'pages/Home/FilterableSliceTable/SliceTableHeader/SliceTableHeader';
import { SliceTableRow } from 'pages/Home/FilterableSliceTable/SliceTableRow/SliceTableRow';

export const FilterableSliceTable = () => {
  const [selectedYear, setSelectedYear] = useState('2020');
  const [selectedTranches, setSelectedTranches] = useState([]);

  useEffect(() => {
    fetch(`/Slices?year=${selectedYear}`)
      .then(response => response.json())
      .then(json => {
        setSelectedTranches(json);
      });
  }, [selectedYear]);

  return (
    <section className="af-panel">
      <header className="af-panel__header">
        <SliceYearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </header>
      <div className="af-panel__content">
        <Table className="af-table">
          <SliceTableHeader />
          <Table.Body>
            {selectedTranches.map(({ low, high, rate }, index) => (
              <SliceTableRow key={index} lowBorn={low} highBorn={high} rate={rate} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};
