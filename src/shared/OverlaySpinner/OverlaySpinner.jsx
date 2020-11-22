import * as React from 'react';
import { Loader } from '@axa-fr/react-toolkit-all';
import './OverlaySpinner.css';

export const OverlaySpinner = props => {
  const { mode, text } = props;

  return (
    <Loader
      mode={mode}
      text={text}
      className="af-loader"
      classModifier="spinner"
    />
  );
};
