import { Button, Container, CssBaseline, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import BarraDeNavegacao from './BarraDeNavegacao';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function FinalizarPartida() {
    const classes = useStyles();

    return (
        <Fragment>
            <BarraDeNavegacao tipo={"jogador"}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Finalizar
                        </Button>
                    </form>
                </div>
            </Container>
        </Fragment>
    );
}