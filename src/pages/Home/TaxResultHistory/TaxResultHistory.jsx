import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import { TableHeader } from 'pages/Home/TaxResultHistory/TableHeader/TableHeader';
import { TableBody } from 'pages/Home/TaxResultHistory/TableBody/TableBody';
import './TaxResultHistory.css';

export const TaxResultHistory = () => {
  return (
    <>
      <h1 className="af-title--content">Historique</h1>
      <Table className="af-table">
        <TableHeader />
        <TableBody />
      </Table>
    </>
  );
};
