import React, { Fragment, useEffect } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import FormulariosJogo from './components/FormulariosJogo';
import { Step, StepLabel, Stepper } from '@material-ui/core';

export default function Jogador() {
  const [atividades, setAtividades] = React.useState([]);
  const [formularios, setFormularios] = React.useState([]);
  const [etapaAtual, setEtapaAtual] = React.useState(0);
  const { enqueueSnackbar }  = useSnackbar();

  useEffect(() => {
    buscaAtividades();
    montaFormularios();
  }, []);

  async function buscaAtividades() {
    setTimeout(() => {
      api.get(`/atividade`)
      .then(({ data }) => {
        setAtividades(data);
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao carregar dados!", {
              variant: "error"
          });
      });
    }, 1000);
  }

  function montaFormularios() {
    let listaFormularios = [];

    for (let atividade in atividades) {
      listaFormularios.push(<FormulariosJogo atividade={atividade} gravarJogada={gravarJogada}/>);
    }

    setFormularios(listaFormularios);
  }

  async function gravarJogada(dados) {
    let i =0;
    proximo();
  }

  function proximo() {
    setEtapaAtual(etapaAtual+1);
  }

  return (
      <Fragment>
        <BarraDeNavegacao tipo={"jogador"}/>

        <Stepper activeStep={etapaAtual}>
          {formularios.map((text, index) => {
            <Step><StepLabel>Atividade {index}</StepLabel></Step>
          })}
        </Stepper>
        {formularios[etapaAtual]}
      </Fragment>
  );
}