import React from "react";
import { Table } from "@axa-fr/react-toolkit-all";

export const SliceTableRow = ({ lowBorn, highBorn, rate }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <span className="af-table-body-content" aria-label="tranche">
          de {lowBorn}€ à {highBorn}€
        </span>
      </Table.Td>
      <Table.Td>
        <span aria-label="taux imposition">
          <b>{rate}%</b>
        </span>
      </Table.Td>
    </Table.Tr>
  );
};
