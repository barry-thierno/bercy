import React, { useState } from 'react';
import { Text, SelectBase, Button, Alert } from '@axa-fr/react-toolkit-all';
import { calculerNbParts } from '../../../shared/taxComputer.helper';
import { OverlaySpinner } from 'shared/OverlaySpinner/OverlaySpinner';

export const TaxComputationForm = ({
  taxRateSetter,
  taxAmountSetter,
  numberOfSharesSetter,
}) => {
  const [adultNumber, setAdultNumber] = useState(1);
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [year, yearSetter] = useState(2020);
  const [modeSpinner, setModeSpinner] = useState('none');
  const [isErrorRequest, setIsErrorRequest] = useState(false);

  const computeTaxeHandler = () => {
    const input = {
      wage: salaryAmount,
      year,
      taxHouseholdComposition: {
        nbAdults: adultNumber,
        nbChildren: numberOfChildren,
      },
    };

    setModeSpinner('post');
    fetch('/TaxComputer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        taxRateSetter(json.marginalTaxRate);
        taxAmountSetter(json.amount);
        setIsErrorRequest(false);
      })
      .catch(error => {
        console.log(error);
        setIsErrorRequest(true);
      })
      .finally(() => setModeSpinner('none'));

    numberOfSharesSetter(calculerNbParts(adultNumber, numberOfChildren));
  };

  return (
    <>
      {isErrorRequest && (
        <Alert
          classModifier="error"
          title="une erreur est survenue, veuillez vérifier les données saisies."
        />
      )}

      <OverlaySpinner mode={modeSpinner} text="Calcul en cours" />

      <form className="af-form tax-form">
        <h1 className="af-title--content">Formulaire</h1>
        <div className="af-form__group">
          <dl>
            <dt>Nombre adulte(s) :</dt>
            <dd>
              <Text
                id="adultnumber"
                name="adultnumber"
                value={adultNumber}
                onChange={({ value }) => setAdultNumber(parseInt(value) || 0)}
              />
            </dd>
          </dl>
          <dl>
            <dt>Montant salaire :</dt>
            <dd>
              <Text
                id="salaryamount"
                name="salaryamount"
                value={salaryAmount}
                onChange={({ value }) => setSalaryAmount(parseInt(value) || 0)}
              />
            </dd>
          </dl>
          <dl>
            <dt>Nombre enfant(s) :</dt>
            <dd>
              <Text
                id="numberofchildren"
                name="numberofchildren"
                value={numberOfChildren}
                onChange={({ value }) =>
                  setNumberOfChildren(parseInt(value) || 0)
                }
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
                value={year}
                onChange={({ value }) => yearSetter(parseInt(value) || 0)}
              />
            </dd>
          </dl>
        </div>
        <div className="af-form__group af-form__btn">
          <Button
            classModifier="hasiconLeft"
            id="validation-button"
            onClick={computeTaxeHandler}>
            <span className="af-btn__text">Calculer</span>
            <i className="glyphicon glyphicon-stats" />
          </Button>
        </div>
      </form>
    </>
  );
};
