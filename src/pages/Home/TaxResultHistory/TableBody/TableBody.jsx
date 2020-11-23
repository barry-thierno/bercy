import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import { TableLine } from 'pages/Home/TaxResultHistory/TableBody/TableLine/TableLine';

export const TableBody = () => {
  return (
    <>
      <Table.Body>
        <TableLine />
        <TableLine />
      </Table.Body>
    </>
  );
};
