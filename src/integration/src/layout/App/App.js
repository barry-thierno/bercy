import React from 'react';
import { Title } from '@axa-fr/react-toolkit-all';
import Home from 'pages/Home/Home';
import HeaderLayout from 'layout/Header/HeaderLayout';
import FooterLayout from 'layout/Footer/FooterLayout';
import './App.css';

const App = () => (
  <>
    <div className="app">
      <HeaderLayout />
      <Title title="Home Page" />
      <div className="app-content">
        <div className="container">
          <Home />
        </div>
      </div>
      <FooterLayout />
    </div>
  </>
);

export default App;
