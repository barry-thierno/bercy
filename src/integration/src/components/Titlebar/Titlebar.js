import React from 'react';
import './Titlebar.scss';

export const Titlebar = ({ title, subtitle }) => (
  <div className="af-title-bar">
    <div className="af-title-bar__wrapper container-fluid container">
      <h1 className="af-title-bar__title">
        {title}
        {subtitle && (
          <small className="af-title-bar__subtitle">{subtitle}</small>
        )}
      </h1>
    </div>
  </div>
);
