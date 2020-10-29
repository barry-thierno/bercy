import React from 'react';
import { Table, SelectBase } from '@axa-fr/react-toolkit-all';

export const FilterableSliceTable = () => {
    return(
      <section className="af-panel">
        <header className="af-panel__header">
         {/* SliceYearSelect */}
        <SliceYearSelect/>
        </header>
        <div className="af-panel__content">
          {/* SliceTable */}
          <Table className="af-table">
            {/* SliceTableHeader */}
            <SliceTableHeader />
            <Table.Body>
              {/* SliceTableRow */}
              <SliceTableRow lowBorn={0} highBorn={10064} rate= {0}/>
              {/* SliceTableRow */}
              <SliceTableRow lowBorn={10064} highBorn={25659} rate= {11}/>
            </Table.Body>
          </Table>
        </div>
      </section>
    );
}

const SliceYearSelect = ()=> {
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
        value="2020"
      />
    </>
  )
}
const SliceTableHeader =() => {
  return (
    <Table.Header>
      <Table.Tr>
        <Table.Th>
          <span className="af-table-th-content">Tranches</span>
        </Table.Th>
        <Table.Th>
          <span className="af-table-th-content">
            Taux d'imposition
          </span>
        </Table.Th>
      </Table.Tr>
    </Table.Header>
  );
}

const SliceTableRow = ({lowBorn, highBorn, rate}) => {
  return (
  <Table.Tr>
    <Table.Td>
      <span className="af-table-body-content">
        de {lowBorn} à {highBorn}
      </span>
    </Table.Td>
    <Table.Td>
      <b>{rate}%</b>
    </Table.Td>
  </Table.Tr>
  )
}
