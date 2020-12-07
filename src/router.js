import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Admin from './pages/Admin';
import Jogador from './pages/Jogador';
import Atividades from './pages/Atividades';
import Ranking from './pages/Ranking';
import BalancoPatrimonial from './pages/BalancoPatrimonial';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Inicio}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/kabil/:param" component={Jogador}/>
            <Route exact path="/atividades" component={Atividades}/>
            <Route exact path="/balanco" component={BalancoPatrimonial}/>
            <Route exact path="/ranking" component={Ranking}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;