import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Inicio() {
  const classes = useStyles();
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const { enqueueSnackbar }  = useSnackbar();
  const history = useHistory();

  function criaJogador() {
    let dados = {"nome": nome, "codigo": codigo}
    console.log(dados)
    setTimeout(() => {
      api.post(`/jogador`, dados)
      .then(({ data }) => {
        localStorage.setItem("ID_PLAYER", data);
        localStorage.setItem("ROOM_COD", codigo);
        history.push("/kabil/play");
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Código está errado ou a sala está inativa!", {
              variant: "error"
          });
      });
    }, 1000);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
            Web Kabil
        </Typography>
        <form className={classes.form} onSubmit={(event) => {event.preventDefault(); criaJogador();}}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="nome"
            value={nome}
            onChange={(event) => {setNome(event.target.value);}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="codigo"
            label="Codigo"
            name="codigo"
            autoComplete="codigo"
            value={codigo}
            onChange={(event) => {setCodigo(event.target.value);}}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Jogo
          </Button>
          <Grid container>
            <Grid item xs>
                <Link href="/login" variant="body2">
                    Login
                </Link>
            </Grid>
            <Grid item>
                <Link href="/cadastro" variant="body2">
                    {"Não possui conta? Cadastre-se!"}
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

