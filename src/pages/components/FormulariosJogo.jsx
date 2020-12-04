import { Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import BarraDeNavegacao from './BarraDeNavegacao';

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

export default function FormulariosJogo({ atividade, gravarJogada}) {
    const classes = useStyles();
    const [valor, setValor] = React.useState(0);

    return (
        <Fragment>
            <BarraDeNavegacao tipo={"jogador"}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography variant="h6">
                        {atividade.descricao}
                    </Typography>
                    <form className={classes.form} >
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
            </Container>
        </Fragment>
    );
}