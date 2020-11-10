import React from 'react';
import { Restitution } from '@axa-fr/react-toolkit-all';

export const TaxResult = ({ taxRate, taxAmount, numberOfShares }) => {
  return (
    <>
      <h1 className="af-title--content">Résultat</h1>
      <div className="tax-result">
        <Restitution label="Taux d'imposition" value={taxRate} />
        <Restitution label="Montant impôt" value={taxAmount} />
        <Restitution label="Nombre de part" value={numberOfShares} />
      </div>
    </>
  );
};
