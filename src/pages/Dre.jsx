import React, { Fragment } from 'react';
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

  function createData(name, calories) {
    return { name, calories };
  }
  
  const rows = [
    createData('RECEITA OPERACIONAL BRUTA', 159),
    createData('Venda de mercadorias', 237),
    createData('(-) DEDUÇÕES DA RECEITA BRUTA', 262),
    createData('Devoluções', 305),
    createData('Impostos e Contribuições', 356),
    createData('(=) RECEITA OPERACIONAL LÍQUIDA', 356),
    createData('(-) DESPESAS OPERACIONAIS', 356),
    createData('Despesas com vendas', 356),
    createData('Despesas Administrativas', 356),
    createData('(=) RESULTADO ANTES DO IMPOSTO DE RENDA ', 356),
    createData('(-) Imposto de Renda', 356),
    createData('(=) RESULTADO LÍQUIDO DO EXERCÍCIO', 356)
  ];

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
        <Box 
            component="div" 
            display="flex" 
            className={classes.box}
        >
          <Card className={classes.root}>
              <CardActionArea onClick={handleClickOpen}>
                  <CardMedia
                      className={classes.media}
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h6" component="h2">
                          Nome do Jovem
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Liquido quentaque
                      </Typography>
                  </CardContent>
              </CardActionArea>
          </Card>
        </Box>
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
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        </StyledTableRow>
                      ))}
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