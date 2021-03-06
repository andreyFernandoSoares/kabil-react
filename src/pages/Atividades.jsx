import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { Container } from '@material-ui/core';
import api from '../services/api';
import { useSnackbar } from 'notistack';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'descricao', numeric: false, disablePadding: true, label: 'Descrição' },
  { id: 'ativo', numeric: false, disablePadding: false, label: 'Ativo' },
  { id: 'passivo', numeric: false, disablePadding: false, label: 'Passivo' },
  { id: 'valor', numeric: true, disablePadding: false, label: 'Valor a vista' },
  { id: 'valorAPrazo', numeric: true, disablePadding: false, label: 'Valor a prazo' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: theme.spacing(4)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, openDialog, deletarAtividades } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Atividades
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deletarAtividades}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={openDialog}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  }
}));

export default function Atividades() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [passivo, setPassivo] = React.useState('');
  const [ativo, setAtivo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const { enqueueSnackbar }  = useSnackbar();
  const [dados, setDados] = React.useState([]);
  const [auxDados, setAuxDados] = React.useState({});
  const [valor, setValor] = React.useState(0);
  const [valorAPrazo, setValorAPrazo] = React.useState(0);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('TOKEN_KEY')
  }

  useEffect(() => {
    buscaAtividades();
  }, [auxDados]);

  async function buscaAtividades() {
    setTimeout(() => {
      api.get(`/atividade`, { headers: headers })
      .then(({ data }) => {
        setDados(data);
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao carregar dados!", {
              variant: "error"
          });
      });
    }, 1000);
  }
  
  const handleDescChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleValorPrazoChange = (event) => {
    setValorAPrazo(event.target.value);
  };

  const handlePassivoChange = (event) => {
    setPassivo(event.target.value);
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value);
  };

  const deletarAtividades = async () => {
    let listaAtividades= [];

    dados.map(dado => {
        selected.map(
          id => {
            if (dado.id === id) {
              listaAtividades.push(dado);
            }
          }
        )
      }
    );

    setTimeout(() => {
      api.delete(`/atividade`, { headers: headers, data: listaAtividades })
      .then(({ data }) => {
        setAuxDados({});
        setSelected([]);
        enqueueSnackbar("Atividade(s) deletada(s) com sucesso!", {
          variant: "success"
        });
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao deletar atividade(s)!", {
              variant: "error"
          });
      });
    }, 1000);
  }

  const limpaDados = () => {
    setAtivo('');
    setDescricao('');
    setPassivo('');
    setValor(0);
    setValorAPrazo(0);
  }

  const cadastraAtividade = async () => {
    let novaAtividade = { 
      "descricao": descricao, 
      "passivo": passivo,
      "ativo": ativo,
      "valor": valor,
      "valorAPrazo": valorAPrazo
    }

    if (descricao !== '' && passivo !==  '' && ativo !==  '') {
      setTimeout(() => {
        api.post(`/atividade`, novaAtividade, { headers: headers })
        .then(({ data }) => {
          enqueueSnackbar("Atividade criada com sucesso!", {
            variant: "success"
          });
          limpaDados();
          setAuxDados(novaAtividade);
          handleClose();
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
            enqueueSnackbar("Falha ao criar atividade!", {
                variant: "error"
            });
        });
      }, 1000);
    } else {
      enqueueSnackbar("Preencha todos os campos!", {
        variant: "error"
      });
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dados.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dados.length - page * rowsPerPage);

  return (
    <Fragment>
        <BarraDeNavegacao tipo={"admin"} />
        
        {/* Inicio tabela */}
        <Container component="main" maxWidth="ls">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar 
                        numSelected={selected.length} 
                        openDialog={handleClickOpen} 
                        deletarAtividades={deletarAtividades}
                    />
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                          classes={classes}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={dados.length}
                        />
                        <TableBody>
                        {stableSort(dados, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            console.log(dados);
                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.descricao}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.descricao}
                                </TableCell>
                                <TableCell align="left">{row.ativo}</TableCell>
                                <TableCell align="left">{row.passivo}</TableCell>
                                <TableCell align="right">{row.valor}</TableCell>
                                <TableCell align="right">{row.valorAPrazo}</TableCell>
                                </TableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={dados.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </Container>
        {/* Fim tabela */}






        {/* Inicio Dialog */}
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cadastrar Atividade</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cadastre as atividades fazendo uso dos campos da tabela de Balanço patrimonial!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        type="text"
                        value={descricao}
                        onChange={handleDescChange}
                        fullWidth
                    />

                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Cadastrar campo Ativo</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={ativo}
                            onChange={handleAtivoChange}
                        >
                            <MenuItem value={"CONTASRECEBER"}>Contas à receber</MenuItem>
                            <MenuItem value={"ESTOQUE"}>Estoque</MenuItem>
                            <MenuItem value={"EQUIPAMENTOS"}>Equipamentos</MenuItem>
                            <MenuItem value={"MOVEISUTENSILIOS"}>Móveis e Utensílios</MenuItem>
                            <MenuItem value={"VEICULOS"}>Veículo</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Cadastrar campo Passivo</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={passivo}
                            onChange={handlePassivoChange}
                        >
                            <MenuItem value={"FORNECEDORES"}>Fornecedores</MenuItem>
                            <MenuItem value={"CONTASAPAGAR"}>Contas a pagar</MenuItem>
                            <MenuItem value={"ALUGUEL"}>Aluguel</MenuItem>
                            <MenuItem value={"FINANCIAMENTOS"}>Financiamentos</MenuItem>
                            <MenuItem value={"EMPRESTIMOS"}>Empréstimos</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="valor"
                        label="Valor a vista"
                        type="text"
                        value={valor}
                        onChange={handleValorChange}
                        fullWidth
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="valorAPrazo"
                        label="Valor a prazo"
                        type="text"
                        value={valorAPrazo}
                        onChange={handleValorPrazoChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={(event) => {
                  event.preventDefault(); 
                  cadastraAtividade();
                }} color="primary">
                    Cadastrar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
        {/* Fim Dialog */}


        
    </Fragment>
  );
}