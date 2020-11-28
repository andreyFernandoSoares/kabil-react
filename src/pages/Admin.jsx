import React, { Fragment } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';

export default function Admin() {
  return (
      <Fragment>
        <BarraDeNavegacao tipo={"admin"}/>
      </Fragment>
  );
}