import React, { useState } from 'react';
import { Table, SelectBase } from '@axa-fr/react-toolkit-all';

export const FilterableSliceTable = () => {
    const [selectedYear, setSelectedYear] = useState("2020");
    const tranches2020 = getAllTranches().find(t => t.year === selectedYear).tranches;
    return(
      <section className="af-panel">
        <header className="af-panel__header">
         {/* SliceYearSelect */}
        <SliceYearSelect selectedYear ={selectedYear} setSelectedYear = {setSelectedYear}/>
        </header>
        <div className="af-panel__content">
          {/* SliceTable */}
          <Table className="af-table">
            {/* SliceTableHeader */}
            <SliceTableHeader />
            <Table.Body>
              {
                tranches2020.map(({id,lowBorn,highBorn, rate })=> 
                (<SliceTableRow key={id} lowBorn={lowBorn} highBorn={highBorn} rate= {rate}/>))
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    );
}

const SliceYearSelect =({selectedYear, setSelectedYear})=> {
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
        value={selectedYear}
        onChange = {({value})=>setSelectedYear(value)}
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

const getAllTranches = () => [
  {
    year: "2019",
    tranches: [
      {
        id: 1,
        rate: 0,
        lowBorn: 0,
        highBorn: 10064,
      },
      {
        id: 2,
        rate: 14,
        lowBorn: 10064,
        highBorn: 27794,
      },
      {
        id: 3,
        rate: 30,
        lowBorn: 27794,
        highBorn: 74517,
      },
      {
        id: 4,
        rate: 41,
        lowBorn: 74517,
        highBorn: 157806,
      },
      {
        id: 5,
        rate: 45,
        lowBorn: 157806,
      },
    ],
  },
  {
    year: "2020",
    tranches: [
      {
        id: 1,
        rate: 0,
        lowBorn: 0,
        highBorn: 10064,
      },
      {
        id: 2,
        rate: 11,
        lowBorn: 10064,
        highBorn: 25659,
      },
      {
        id: 3,
        rate: 30,
        lowBorn: 25659,
        highBorn: 73369,
      },
      {
        id: 4,
        rate: 41,
        lowBorn: 73369,
        highBorn: 157806,
      },
      {
        id: 5,
        rate: 45,
        lowBorn: 157806,
      },
    ],
  },
];