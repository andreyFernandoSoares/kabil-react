import React, { Fragment, useEffect } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import FinalizarPartida from './components/FinalizarPartida';
import { Step, StepLabel, Stepper } from '@material-ui/core';
import Formularios from './components/Formularios';

export default function Jogador() {
  const [etapaAtual, setEtapaAtual] = React.useState(0);
  const [formularios, setFormularios] = React.useState([]);
  const { enqueueSnackbar }  = useSnackbar();
  const jogadorId = parseInt(localStorage.getItem('ID_PLAYER'));
  const codigo = localStorage.getItem('ROOM_COD');
  let etapaAtividade = parseInt(localStorage.getItem('STEP'));
  
  useEffect(() => {
    buscaDados();
  }, []);

  async function buscaDados() {
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
    localStorage.setItem('STEP', etapaAtividade+1);
    etapaAtividade = parseInt(localStorage.getItem('STEP'));
    setEtapaAtual(etapaAtividade);
  }
 
  function montaFormularios(data) {
    console.log(data.length)
    let listaFormularios = [
      <Formularios atividade={data[0]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[1]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[2]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[3]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[4]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[5]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[6]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[7]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[8]} gravarJogada={gravarJogada}/>,
      <Formularios atividade={data[9]} gravarJogada={gravarJogada}/>,
      <FinalizarPartida />
    ];

    setFormularios(listaFormularios);
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
       {etapaAtual}
       {formularios[etapaAtual]}
     </Fragment>
  );
}