import React, { useState } from 'react';
import {
  Text,
  SelectBase,
  Button,
  Restitution,
} from '@axa-fr/react-toolkit-all';
import './Home.css';
import { calculImpot } from '../../calculateur/bercy';

const Home = () => {
  return (
    <>
      <div className="tax-calculation">
        <div className="tax-calculation_content">
          <form className="af-form tax-form">
            <h2 className="af-title--content">Formulaire</h2>
            <div className="af-form__group">
              <dl>
                <dt>Nombre adulte(s) :</dt>
                <dd>
                  <Text
                    id="adultnumber"
                    name="adultnumber"
                    onChange={event => console.log(event)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>Montant salaire :</dt>
                <dd>
                  <Text
                    id="salaryamount"
                    name="salaryamount"
                    onChange={event => console.log(event)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>Nombre enfant(s) :</dt>
                <dd>
                  <Text
                    id="numberofchildren"
                    name="numberofchildren"
                    onChange={event => console.log(event)}
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
                    onChange={event => console.log(event)}
                  />
                </dd>
              </dl>
            </div>
            <div className="af-form__group af-form__btn">
              <Button
                classModifier="hasiconLeft"
                id="validation-button"
                onClick={event => console.log(event)}>
                <span className="af-btn__text">Calculer</span>
                <i className="glyphicon glyphicon-stats" />
              </Button>
            </div>
          </form>

          <h2 className="af-title--content">Résultat</h2>
          <div className="tax-result">
            <Restitution label="Taux d'imposition" value="****" />
            <Restitution label="Montant impôt" value="****" />
            <Restitution label="Nombre de parts" value="****" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
