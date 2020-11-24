import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import { TableHeader } from 'pages/Home/TaxResultHistory/TableHeader/TableHeader';
import { TableLine } from 'pages/Home/TaxResultHistory/TableLine/TableLine';
import './TaxResultHistory.css';

const taxCalculationResults = [
  {
    input: {
      adultNumber: 1,
      salaryAmount: 20000,
      numberOfChildren: 1,
      year: 2019,
    },
    result: {
      taxRate: 0,
      taxAmount: 0,
      numberOfShares: 1.5,
    },
  },
  {
    input: {
      adultNumber: 1,
      salaryAmount: 20000,
      numberOfChildren: 1,
      year: 2020,
    },
    result: {
      taxRate: 0,
      taxAmount: 0,
      numberOfShares: 1.5,
    },
  },
];

export const TaxResultHistory = () => {
  return (
    <>
      <h1 className="af-title--content">Historique</h1>
      <Table className="af-table">
        <TableHeader />
        <Table.Body>
          {taxCalculationResults.map(taxCalculationResult => (
            <TableLine taxCalculationResult={taxCalculationResult} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
