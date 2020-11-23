import React from 'react';
import { Table } from '@axa-fr/react-toolkit-all';

export const TableLine = () => {
  return (
    <>
      <Table.Tr>
        <Table.Td>
          <div className="tax-result tax-result__column">
            <dl className="af-restitution__listdef">
              <dt className="af-restitution__listdef-item">
                <span className="af-restitution__text">Nombre adulte(s) :</span>
              </dt>
              <dd className="af-restitution__listdef-value">2</dd>
            </dl>
            <dl className="af-restitution__listdef">
              <dt className="af-restitution__listdef-item">
                <span className="af-restitution__text">Nombre enfant(s) :</span>
              </dt>
              <dd className="af-restitution__listdef-value">3</dd>
            </dl>
            <dl className="af-restitution__listdef">
              <dt className="af-restitution__listdef-item">
                <span className="af-restitution__text">Montant salaire :</span>
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
                <span className="af-restitution__text">Taux d'imposition</span>
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
    </>
  );
};
