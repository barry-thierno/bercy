import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';

export const TableHeader = () => {
  return (
    <>
      <Table.Header>
        <Table.Tr>
          <Table.Th>
            <span className="af-table-th-content">Données Saisies</span>
          </Table.Th>
          <Table.Th>
            <span className="af-table-th-content">Résultats</span>
          </Table.Th>
        </Table.Tr>
      </Table.Header>
    </>
  );
};
