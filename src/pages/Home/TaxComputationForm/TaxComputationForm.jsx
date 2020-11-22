import React, { useState, useEffect } from 'react';
import { Text, SelectBase, Button } from '@axa-fr/react-toolkit-all';
import { computeTaxeService } from '../../../shared/taxComputer.helper';
import axios from 'axios';

export const TaxComputationForm = ({
  taxRateSetter,
  taxAmountSetter,
  numberOfSharesSetter,
}) => {
  const [adultNumber, setAdultNumber] = useState(1);
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [year, yearSetter] = useState(2020);

  useEffect(() => {
    // document.title = `Vous avez cliqué ${count} fois`;
  });

  const computeTaxeHandler = () => {
    const { taxAmount, taxRate, numberOfShares } = computeTaxeService(
      salaryAmount,
      adultNumber,
      numberOfChildren,
      year
    );
    const model = {
      wage: 55000,
      year: 2020,
      taxHouseholdComposition: {
        nbAdults: 2,
        nbChildren: 2,
      },
    };

    // fetch('https://bercywebapi.azurewebsites.net/api/v1/TaxComputer', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    //   },
    //   // headers: { 'Content-Type': 'application/javascript' },
    //   body: { username: 'username', password: 'password' },
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json.title))
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // fetch('https://bercywebapi.azurewebsites.net/api/v1/TaxComputer', {
    //   method: 'post',
    //   body: JSON.stringify({
    //     wage: 55000,
    //     year: 2020,
    //     taxHouseholdComposition: {
    //       nbAdults: 2,
    //       nbChildren: 2,
    //     },
    //   }),
    //   mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json; charset=utf-8',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json.title))
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // var raw = JSON.stringify({
    //   wage: 55000,
    //   year: 2020,
    //   taxHouseholdComposition: { nbAdults: 2, nbChildren: 2 },
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };

    // fetch(
    //   'https://bercywebapi.azurewebsites.net/api/v1/TaxComputer',
    //   requestOptions
    // )
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    var data = JSON.stringify({
      wage: 55000,
      year: 2020,
      taxHouseholdComposition: { nbAdults: 2, nbChildren: 2 },
    });

    var config = {
      method: 'post',
      url: 'https://bercywebapi.azurewebsites.net/api/v1/TaxComputer',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    taxRateSetter(taxRate.toString());
    taxAmountSetter(taxAmount.toString());
    numberOfSharesSetter(numberOfShares.toString());
  };

  return (
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
  );
};
