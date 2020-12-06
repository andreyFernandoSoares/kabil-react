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

export default function Dre() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ranking, setRanking] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar }  = useSnackbar();

  const headers = {
    'Authorization': localStorage.getItem('TOKEN_KEY')
  }

  useEffect(() => {
    setInterval(() => {
      buscaDre();
    }, 10000);
  }, []);

  async function buscaDre() {
    setTimeout(() => {
      api.get(`/ranking`, { headers: headers })
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
    }, 10000);
  }

  function criarDados(nome, valor) {
    return { nome, valor };
  }
  
  function montaDre(dre) {
    setRows(
      criarDados('RECEITA OPERACIONAL BRUTA', dre.receitaBruta),
      criarDados('Venda de mercadorias', dre.vendaMercadorias),
      criarDados('(-) DEDUÇÕES DA RECEITA BRUTA', dre.deducoesReceitaBruta),
      criarDados('Devoluções', dre.devolucoes),
      criarDados('Impostos e Contribuições', dre.impostosContribuicoes),
      criarDados('(=) RECEITA OPERACIONAL LÍQUIDA', dre.receitaOperacionalLiquida),
      criarDados('(-) DESPESAS OPERACIONAIS', dre.dispensasOperacionais),
      criarDados('Despesas com vendas', dre.despesasComVendas),
      criarDados('Despesas Administrativas', dre.despesasAdministrativas),
      criarDados('(=) RESULTADO ANTES DO IMPOSTO DE RENDA ', dre.resultadoAntesDoImposto),
      criarDados('(-) Imposto de Renda', dre.impostoRenda),
      criarDados('(=) RESULTADO LÍQUIDO DO EXERCÍCIO', dre.resultadoLiquidoExercicio)
    )

    handleClickOpen();
  };

  const handleClickOpen = () => {
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
                  <CardActionArea onClick={montaDre(rank.jogador.dre)}>
                      <CardMedia
                          className={classes.media}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" component="h2">
                            { rank.jogador.nome }
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            { rank.resultadoLiquidoExercicio }
                          </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
            </Box> 
        })}
        {/* Fim Cards */}


        {/* Inicio Dialog */}
          <Dialog open={open} onClose={handleClose} fullScreen={true} >
            <DialogTitle>Nome do jovem</DialogTitle>
            <DialogContent>
                <DialogContentText>
                  Demonstração do resultado do exercício !
                </DialogContentText>

                {/* Inicio da tabela */}
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Campo</StyledTableCell>
                        <StyledTableCell align="right">Valor</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => {
                        <StyledTableRow key={row.nome}>
                          <StyledTableCell component="th" scope="row">
                            {row.nome}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.valor}</StyledTableCell>
                        </StyledTableRow>
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Fim da tabela */}
                
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