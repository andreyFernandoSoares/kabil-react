import { Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
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

    function montaDados() {
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography variant="h6" align="center">
                        {atividade.descricao}
                    </Typography>
                    <form className={classes.form} onSubmit={(event) => {event.preventDefault(); montaDados();}}>
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