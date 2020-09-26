import React from 'react';
import {
  Text,
  SelectBase,
  Button,
  Restitution,
  Table,
} from '@axa-fr/react-toolkit-all';
import './Home.scss';

const Home = () => (
  <>
    <p>Hello World</p>
    <div class="tax-calculation">
      <div className="tax-calculation_form">
        <form class="af-form tax-form">
          <h1 class="af-title--content">Formulaire</h1>
          <div className="af-form__group">
            <dl>
              <dt>Nombre adulte :</dt>
              <dd>
                <Text id="adultnumber" name="adultnumber" label="test" />
              </dd>
            </dl>
            <dl>
              <dt>Montant salaire :</dt>
              <dd>
                <Text id="salaryamount" name="salaryamount" label="test" />
              </dd>
            </dl>
            <dl>
              <dt>Nombre enfant :</dt>
              <dd>
                <Text
                  id="numberofchildren"
                  name="numberofchildren"
                  label="test"
                />
              </dd>
            </dl>
            <dl>
              <dt>Année :</dt>
              <dd>
                <SelectBase
                  key="key"
                  name="year"
                  options={[
                    { value: '2019', label: '2019' },
                    { value: '2020', label: '2020' },
                  ]}
                  value="2020"
                />
              </dd>
            </dl>
          </div>
          <div className="af-form__group af-form__btn">
            <Button
              classModifier="hasiconLeft"
              id="validation-button"
              onClick={undefined}>
              <span className="af-btn__text">Calculer</span>
              <i className="glyphicon glyphicon-stats" />
            </Button>
          </div>
        </form>

        <h1 className="af-title--content">Résultat</h1>
        <div className="tax-result">
          <Restitution label="Taux d'imposition" value="***" />
          <Restitution label="Montant impôt" value="****" />
          <Restitution label="Nombre de part" value="****" />
        </div>
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
