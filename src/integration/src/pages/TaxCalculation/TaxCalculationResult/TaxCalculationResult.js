import React from 'react';
import { Restitution } from '@axa-fr/react-toolkit-all';

export const TaxCalculationResult = () => (
  <>
    <h1 className="af-title--content">Résultat</h1>
    <div className="tax-result">
      <Restitution label="Taux d'imposition" value="***" />
      <Restitution label="Montant impôt" value="****" />
      <Restitution label="Nombre de part" value="****" />
    </div>
  </>
);
