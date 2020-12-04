import React, { Fragment, useEffect } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import FormulariosJogo from './components/FormulariosJogo';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import FinalizarPartida from './components/FinalizarPartida';

export default function Jogador() {
  const [atividades, setAtividades] = React.useState([]);
  const [formularios, setFormularios] = React.useState([]);
  const [etapaAtual, setEtapaAtual] = React.useState(0);
  const { enqueueSnackbar }  = useSnackbar();
  const jogadorId = parseInt(localStorage.getItem('ID_PLAYER'));

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

    for (let atividade in atividades) 
      listaFormularios.push(<FormulariosJogo atividade={atividade} gravarJogada={gravarJogada}/>);
  
    listaFormularios.push(<FinalizarPartida />);

    setFormularios(listaFormularios);
  }

  async function gravarJogada(dados) {
    setTimeout(() => {
      api.put(`/jogador/${jogadorId}`, dados)
      .then(({ data }) => {
        proximo();
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao enviar dados!", {
              variant: "error"
          });
      });
    }, 1000);
  }

  function proximo() {
    setEtapaAtual(etapaAtual+1);
  }

  return (
      <Fragment>
        <BarraDeNavegacao tipo={"jogador"}/>

        <Stepper activeStep={etapaAtual}>
          {formularios.map((text, index) => {
            index != 10 ?
              <Step><StepLabel>Atividade {index+1}</StepLabel></Step>
            : 
              <Step><StepLabel>Finalizar</StepLabel></Step>
          })}
        </Stepper>
        {formularios[etapaAtual]}
      </Fragment>
  );
}