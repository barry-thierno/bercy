import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';

export const SliceTableRow = ({ lowBorn, highBorn, rate }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <span className="af-table-body-content">
          de {lowBorn}€ à {highBorn}€
        </span>
      </Table.Td>
      <Table.Td>
        <b>{rate}%</b>
      </Table.Td>
    </Table.Tr>
  );
};
