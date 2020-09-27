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
    {/* Template sans Toolkit Axa */}
    <div className="tax-calculation">
      <div className="tax-calculation_content">
        <form className="af-form tax-form">
          <h1 className="af-title--content">Formulaire</h1>
          <div className="af-form__group">
            <dl>
              <dt>Nombre adulte(s) :</dt>
              <dd>
                <input id="adultnumber" name="adultnumber" type="text" />
              </dd>
            </dl>
            <dl>
              <dt>Montant salaire :</dt>
              <dd>
                <input id="salaryamount" name="salaryamount" type="text" />
              </dd>
            </dl>
            <dl>
              <dt>Nombre enfant(s) :</dt>
              <dd>
                <input
                  id="numberofchildren"
                  name="numberofchildren"
                  type="text"
                />
              </dd>
            </dl>
            <dl>
              <dt>Année :</dt>
              <dd>
                <select id="year" key="key" name="year" value="2020">
                  <option>2019</option>
                  <option>2020</option>
                </select>
              </dd>
            </dl>
          </div>
          <div className="af-form__group af-form__btn">
            <button className="hasiconLeft" id="validation-button">
              <span className="af-btn__text">Calculer</span>
              <i className="glyphicon glyphicon-stats" />
            </button>
          </div>
        </form>

        <h1 className="af-title--content">Résultat</h1>
        <div className="tax-result">
          <dl className="af-restitution__listdef">
            <dt className="af-restitution__listdef-item">
              <span className="af-restitution__text">Taux d'imposition</span>
            </dt>
            <dd className="af-restitution__listdef-value">***</dd>
          </dl>
          <dl className="af-restitution__listdef">
            <dt className="af-restitution__listdef-item">
              <span className="af-restitution__text">Montant impôt</span>
            </dt>
            <dd className="af-restitution__listdef-value">***</dd>
          </dl>
          <dl className="af-restitution__listdef">
            <dt className="af-restitution__listdef-item">
              <span className="af-restitution__text">Nombre de part</span>
            </dt>
            <dd className="af-restitution__listdef-value">***</dd>
          </dl>
        </div>
      </div>

      <aside className="tax-calculation_maximum-ceiling">
        <section className="af-panel">
          <header className="af-panel__header">
            <span className="af-panel__title">Taux d'imposition par année</span>
            <select id="year" key="key" name="year" value="2020">
              <option>2019</option>
              <option>2020</option>
            </select>
          </header>
          <div className="af-panel__content">
            <table className="af-table">
              <thead>
                <tr>
                  <th>
                    <span className="af-table-th-content">Tranches</span>
                  </th>
                  <th>
                    <span className="af-table-th-content">
                      Taux d'imposition
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="af-table-body-content">
                      jusqu'à 9 964€
                    </span>
                  </td>
                  <td>
                    <b>0%</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="af-table-body-content">
                      de 9964 à 27519
                    </span>
                  </td>
                  <td>
                    <b>14%</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </aside>
    </div>
    {/* FIN - Template sans Toolkit Axa */}

    {/* Template avec Toolkit Axa */}
    <div className="tax-calculation">
      <div className="tax-calculation_content">
        <form className="af-form tax-form">
          <h1 className="af-title--content">Formulaire</h1>
          <div className="af-form__group">
            <dl>
              <dt>Nombre adulte(s) :</dt>
              <dd>
                <Text
                  id="adultnumber"
                  name="adultnumber"
                  onChange={() => console.log()}
                />
              </dd>
            </dl>
            <dl>
              <dt>Montant salaire :</dt>
              <dd>
                <Text
                  id="salaryamount"
                  name="salaryamount"
                  onChange={undefined}
                />
              </dd>
            </dl>
            <dl>
              <dt>Nombre enfant(s) :</dt>
              <dd>
                <Text
                  id="numberofchildren"
                  name="numberofchildren"
                  onChange={undefined}
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
                  onChange={undefined}
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
    {/* FIN - Template avec Toolkit Axa */}
  </>
);

export default Home;
