import React from 'react';
import { Text, SelectBase, Button } from '@axa-fr/react-toolkit-all';

export const TaxCalculationForm = () => (
  <>
    <h1 className="af-title--content">Formulaire</h1>
    <div className="flex-container">
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
          <Text id="numberofchildren" name="numberofchildren" label="test" />
        </dd>
      </dl>
      <dl>
        <dt>Année :</dt>
        <dd>
          <SelectBase
            key="key"
            name="year"
            placeholder="-Sélectionner"
            options={[
              { value: 'choice1', label: '2019' },
              { value: 'choice2', label: '2020' },
            ]}
            value="1"
          />
        </dd>
      </dl>
    </div>
    <div className="af-form__group af-form__btn">
      <Button classModifier="hasiconLeft" id="validation-button">
        <span className="af-btn__text">Calculer</span>
        <i className="glyphicon glyphicon-stats" />
      </Button>
    </div>
  </>
);
