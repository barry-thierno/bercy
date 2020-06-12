import React from 'react';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import { Header, Name } from '@axa-fr/react-toolkit-all';
import './Header.scss';

const HeaderComponent = ({ userName }) => (
  <Header>
    <Name
      title="Dojo Bercy"
      subtitle="Tax Calculation"
      img={logo}
      alt="Logo"
      onClick={() => {}}
    />
  </Header>
);

export default HeaderComponent;
