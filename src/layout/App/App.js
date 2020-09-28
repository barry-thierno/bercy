import React from 'react';
import { Header, Name, Footer } from '@axa-fr/react-toolkit-all';
import { Title } from '@axa-fr/react-toolkit-layout-header';
import logo from '@axa-fr/react-toolkit-core/dist/assets/logo-axa.svg';
import './App.scss';
import Home from 'pages/Home/Home';

const App = () => (
  <>
    <div className="app">
      <Header>
        <Name
          title="AXA"
          subtitle="Dojo Bercy"
          img={logo}
          alt="Logo"
          onClick={() => {}}
        />
      </Header>
      <Title title="Home Page" />
      <div className="app-content">
        <div className="container">
          <Home />
        </div>
      </div>
      <Footer icon={logo} copyright={'© 2020 AXA All Rights Reserved'} />
    </div>
  </>
);

export default App;