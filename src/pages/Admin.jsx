import React, { Fragment } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import Cards from './components/Cards';

export default function Admin() {
  return (
      <Fragment>
        <BarraDeNavegacao tipo={"admin"}/>
        <Cards />
      </Fragment>
  );
}