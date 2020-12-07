import React, { Fragment, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../services/api';
import { useSnackbar } from 'notistack';
import BalancoJogador from './components/BalancoJogador';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    padding: theme.spacing(3),
    margin: theme.spacing(2)
  },
  media: {
    height: 80,
  },
  box: {
      padding: theme.spacing(3)
  },
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Ranking() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ranking, setRanking] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar }  = useSnackbar();

  const headers = {
    'Authorization': localStorage.getItem('TOKEN_KEY'),
    'Content-Type': 'application/json'
  }

  useEffect(() => {
      buscaDre();
  }, []);

  async function buscaDre() {
    await api.get(`/ranking`, { headers: headers })
      .then(({ data }) => {
        setRanking(data);
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao carregar ranking!", {
              variant: "error"
          });
      });
  }

  const handleClickOpen = (jogador) => {
    localStorage.setItem('ID_PLAYER', jogador.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Fragment>
        <BarraDeNavegacao tipo={"admin"}/>

        {/* Inicio Cards */}
        {ranking.map((rank, index) => {
            <Box 
                component="div" 
                display="flex" 
                className={classes.box}
            >
              <Card className={classes.root}>
                  <CardActionArea onClick={handleClickOpen(rank.jogador)}>
                      <CardMedia
                          className={classes.media}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" component="h2">
                            { rank.jogador.nome }
                          </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
            </Box> 
        })}
        {/* Fim Cards */}


        {/* Inicio Dialog */}
          <Dialog open={open} onClose={handleClose} fullScreen={true} >
            <DialogTitle>Balanço Patrimonial</DialogTitle>
            <DialogContent>
                <BalancoJogador />
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Sair
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        {/* Fim Dialog */}
      </Fragment>
  );
}