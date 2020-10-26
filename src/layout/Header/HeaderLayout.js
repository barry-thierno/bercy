import React from 'react';
import { Header, Name} from '@axa-fr/react-toolkit-all';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';

const HeaderLayout = () => (
      <Header>
        <Name
          title="AXA"
          subtitle="Dojo Bercy"
          img={logo}
          alt="Logo"
          onClick={() => {}}
        />
      </Header>
);

export default HeaderLayout;
