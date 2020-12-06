import { Button, Container, CssBaseline, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSnackbar } from 'notistack';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

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
    const { enqueueSnackbar }  = useSnackbar();
    const jogadorId = localStorage.getItem('ID_PLAYER');
    const codigo = localStorage.getItem('ROOM_COD');
    const history = useHistory();

    async function gravaDre() {
        setTimeout(() => {
            api.post(`jogador/finaliza/${jogadorId}/${codigo}`)
            .then(({ data }) => {
                localStorage.removeItem('ID_PLAYER');
                localStorage.removeItem('ROOM_COD');
                history.push("/")
            })
            .catch((error) => {
                console.log("error");
                console.log(error);
                enqueueSnackbar("Falha ao monstar Dre!", {
                    variant: "error"
                });
            });
        }, 1000);
    }

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={(event) => {event.preventDefault(); gravaDre();}}>
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