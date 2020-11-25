import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';

export const SliceTableHeader = () => {
  return (
    <Table.Header>
      <Table.Tr>
        <Table.Th>
          <span className="af-table-th-content">Tranches</span>
        </Table.Th>
        <Table.Th>
          <span className="af-table-th-content">Taux d'imposition</span>
        </Table.Th>
      </Table.Tr>
    </Table.Header>
  );
};
