import React, { Fragment, useEffect, useState } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import { Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import FinalizarPartida from './components/FinalizarPartida';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Jogador() {
  const classes = useStyles();
  const [formularios, setFormularios] = useState([]);
  const { enqueueSnackbar }  = useSnackbar();
  const jogadorId = parseInt(localStorage.getItem('ID_PLAYER'));
  const codigo = localStorage.getItem('ROOM_COD');
  
  const [valor, setValor] = React.useState(0);
  
  useEffect(() => {
    buscaDados();
  }, []);

  async function buscaDados() {
    setTimeout(() => {
      api.get(`/sala/${codigo}`)
      .then(({ data }) => {
        setFormularios(data);
        console.log(formularios)
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao carregar dados!", {
              variant: "error"
          });
      });
    }, 3000);
  }

  async function gravarJogada(dados) {
    setTimeout(() => {
      api.put(`/jogador/${jogadorId}`, dados)
      .then(({ data }) => {
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

  function montaDados(atividade) {
      let dados = {
          "ativo": atividade.ativo,
          "passivo": atividade.passivo,
          "valor": valor
      }
      setValor(0);
      gravarJogada(dados);
  }

    return (
        <Fragment>
          <BarraDeNavegacao/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                { formularios.map((atividade, index) => {
                  <div className={classes.paper}>
                      <Typography variant="h6" align="center">
                          {atividade.descricao}
                      </Typography>
                      <form className={classes.form} onSubmit={(event) => {event.preventDefault(); montaDados(atividade);}}>
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="valor"
                              label="Valor"
                              name="valor"
                              autoComplete="valor"
                              type="number"
                              value={valor}
                              onChange={(event) => {setValor(event.target.value);}}
                              autoFocus
                          />
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                          >
                              Enviar
                          </Button>
                      </form>
                  </div>
                })}
            </Container>
            <FinalizarPartida/>
        </Fragment>
    );


}