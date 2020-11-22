import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';
import './TaxResultHistory.css';

export const TaxResultHistory = () => {
  return (
    <>
      <h1 className="af-title--content">Historique</h1>
      <Table className="af-table">
        <Table.Header>
          <Table.Tr>
            <Table.Th>
              <span className="af-table-th-content">Exemples</span>
            </Table.Th>
            <Table.Th>
              <span className="af-table-th-content">Résultats</span>
            </Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          <Table.Tr>
            <Table.Td>
              <div className="tax-result tax-result__column">
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Nombre adulte(s) :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">2</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Nombre enfant(s) :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">3</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Montant salaire :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">52000</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Année :</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">2020</dd>
                </dl>
              </div>
            </Table.Td>
            <Table.Td>
              <div className="tax-result tax-result__column">
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Taux d'imposition
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Montant impôt</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Nombre de part</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
              </div>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <div className="tax-result tax-result__column">
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Nombre adulte(s) :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">2</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Nombre enfant(s) :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">3</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Montant salaire :
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">52000</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Année :</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">2020</dd>
                </dl>
              </div>
            </Table.Td>
            <Table.Td>
              <div className="tax-result tax-result__column">
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">
                      Taux d'imposition
                    </span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Montant impôt</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
                <dl className="af-restitution__listdef">
                  <dt className="af-restitution__listdef-item">
                    <span className="af-restitution__text">Nombre de part</span>
                  </dt>
                  <dd className="af-restitution__listdef-value">0</dd>
                </dl>
              </div>
            </Table.Td>
          </Table.Tr>
        </Table.Body>
      </Table>
    </>
  );
};
