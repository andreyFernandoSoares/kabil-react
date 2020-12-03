import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../services/api';
import { useSnackbar } from 'notistack';
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

export default function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const { enqueueSnackbar }  = useSnackbar();
  const query = props.location.search.includes("create=success");

  useEffect(() => {
    if (query) {
      enqueueSnackbar("Cadastro realizado com sucesso!", {
        variant: "success"
      });
    }
  }, []);

  async function logar() {
    let dados = { "nome": nome, "senha": senha }

    setTimeout(() => {
      api.post(`/auth`, dados)
      .then(({ data }) => {
        const token = data.tipo+" "+data.token;
        localStorage.setItem('TOKEN_KEY', token);
        localStorage.setItem('ID_USER', data.usuarioId);
        history.push("/admin");
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao Logar!", {
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
        <form className={classes.form} noValidate onSubmit={(event) => {event.preventDefault(); logar()}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            value={nome}
            onChange={(event) => {setNome(event.target.value);}}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            onChange={(event) => {setSenha(event.target.value);}}
            value={senha}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Logar
          </Button>
          <Grid container>
            <Grid item xs>
                <Link href="/cadastro" variant="body2">
                  Não possui uma conta? Crie aqui.
                </Link>
            </Grid>
            <Grid item>
                <Link href="/" variant="body2">
                    {"Jogar"}
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

