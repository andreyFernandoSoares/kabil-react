import React, { Fragment, useEffect } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import FormulariosJogo from './components/FormulariosJogo';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import FinalizarPartida from './components/FinalizarPartida';

export default function Jogador() {
  const [formularios, setFormularios] = React.useState([]);
  const [etapaAtual, setEtapaAtual] = React.useState(0);
  const { enqueueSnackbar }  = useSnackbar();
  const jogadorId = parseInt(localStorage.getItem('ID_PLAYER'));
  const codigo = localStorage.getItem('ROOM_COD');

  useEffect(() => {
    buscaAtividades();
  }, []);

  async function buscaAtividades() {
    setTimeout(() => {
      api.get(`/sala/${codigo}`)
      .then(({ data }) => {
        montaFormularios(data);
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

  function montaFormularios(data) {
    let listaFormularios = [
      <FormulariosJogo atividade={data[0]} gravarJogada={gravarJogada}/>,
      <FormulariosJogo atividade={data[1]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[2]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[3]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[4]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[5]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[6]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[7]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[8]} gravarJogada={gravarJogada}/>,
      // <FormulariosJogo atividade={atividades[9]} gravarJogada={gravarJogada}/>,
      <FinalizarPartida />
    ];

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
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Atividade</StepLabel></Step>
            <Step><StepLabel>Finalizar</StepLabel></Step>
        </Stepper>
        {formularios[etapaAtual]}
      </Fragment>
  );
}