import React from 'react';
import {
  SelectBase,
  Table,
} from '@axa-fr/react-toolkit-all';
import './Home.css';

const Home = () => (
  <>
    <div className="tax-calculation">
      <div className="tax-calculation_content">
      <div>Formulaire</div>
      </div>

      <aside className="tax-calculation_maximum-ceiling">
        <section className="af-panel">
          <header className="af-panel__header">
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
          </header>
          <div className="af-panel__content">
            <Table className="af-table">
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
              <Table.Body>
                <Table.Tr>
                  <Table.Td>
                    <span className="af-table-body-content">
                      jusqu'à 9 964€
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <b>0%</b>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <span className="af-table-body-content">
                      de 9964 à 27519
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <b>14%</b>
                  </Table.Td>
                </Table.Tr>
              </Table.Body>
            </Table>
          </div>
        </section>
      </aside>
    </div>
  </>
);

export default Home;
