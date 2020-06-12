import React from 'react';
import { Table, SelectBase } from '@axa-fr/react-toolkit-all';

export const MaximumCeiling = () => (
  <>
    <article className="af-panel">
      <header className="af-panel__header">
        <span className="af-panel__title">Taux d'imposition par année</span>
        <SelectBase
          key="key"
          name="name"
          placeholder="-Sélectionner"
          options={[
            { value: 'choice1', label: '2019' },
            { value: 'choice2', label: '2020' },
          ]}
          value="1"
        />
      </header>
      <section className="af-panel__content">
        <Table className="af-table">
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
          <Table.Body>
            <Table.Tr>
              <Table.Td>
                <span className="af-table-body-content">jusqu'à 9 964€</span>
              </Table.Td>
              <Table.Td>
                <b>0%</b>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <span className="af-table-body-content">de 9964 à 27519</span>
              </Table.Td>
              <Table.Td>
                <b>14%</b>
              </Table.Td>
            </Table.Tr>
          </Table.Body>
        </Table>
      </section>
    </article>
  </>
);
