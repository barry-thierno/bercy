import React, { useState } from 'react';
import {
  Text,
  SelectBase,
  Button,
  Restitution,
  Number,
} from '@axa-fr/react-toolkit-all';
import './Home.css';

const Home = () => {
  const [nombreAdultes, setNombresAdultes] = useState('');

  return (
    <>
      <div className="tax-calculation">
        <div className="tax-calculation_content">
          <form className="af-form tax-form">
            <h1 className="af-title--content">Formulaire</h1>
            <div className="af-form__group">
              <dl>
                <dt>Nombre adulte(s) :</dt>
                <dd>
                  <Number
                    id="adultnumber"
                    name="adultnumber"
                    onChange={event => setNombresAdultes(event.value)}
                    value={nombreAdultes}
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
      </div>
    </>
  );
};

export default Home;
