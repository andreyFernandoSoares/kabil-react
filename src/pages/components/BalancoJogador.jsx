import { Container, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5)
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    float: 'right'
  }
}));

export default function BalancoJogador() {
  const classes = useStyles();
  const [balanco, setBalanco] = React.useState({});
  const { enqueueSnackbar }  = useSnackbar();

  const jogadorId = parseInt(localStorage.getItem('ID_PLAYER'));

  useEffect(() => {
    preencheBalanco();
  }, []);

  async function preencheBalanco() {
    setTimeout(() => {
      api.get(`/jogador/${jogadorId}`)
      .then(({ data }) => {
        setBalanco(data);
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao carregar Balanço patrimonial !", {
              variant: "error"
          });
      });
    }, 1000);
  }

  function AtivoAndPassivo() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <strong>1.0 Ativo</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={balanco.ativo}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.0 Passivo</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={balanco.passivo}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function Circulante() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <strong>1.1 Ativo Circulante</strong>
          <TextField
            id="ativoCirculante"
            className={classes.textField}
            size="small"
            disabled={true}
            value={balanco.ativoCirculante}
          />
        </Grid>
        <Grid item xs={4}>
        <strong>2.1 Passivo Circulante</strong>
        <TextField
            id="passivoCirculante"
            className={classes.textField}
            size="small"
            disabled={true}
            value={balanco.passivoCirculante}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function CaixaAndFornecedores() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.1.1 Caixa
          <TextField
            id="caixa"
            className={classes.textField}
            type="number"
            disabled={true}
            value={balanco.caixa}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.1 Fornecedores
          <TextField
            id="fornecedores"
            className={classes.textField}
            type="number"
            disabled={true}
            value={balanco.fornecedores}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function ContasAndSalarios() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.1.2 Contas à receber
          <TextField
            className={classes.textField}
            id="contasAReceber"
            size="small"
            type="number"
            disabled={true}
            value={balanco.contasAReceber}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.2 Salários
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="salarios"
            disabled={true}
            value={balanco.salarios}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function EstoqueAndImpostos() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.1.3 Estoque
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="estoque"
            disabled={true}
            value={balanco.estoque}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.3 Impostos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="impostos"
            disabled={true}
            value={balanco.impostos}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function NaoCirculanteAndAluguel() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <strong>1.2 Ativo Não Circulante</strong>
          <TextField
            className={classes.textField}
            size="small"
            id="ativoNaoCirculante"
            disabled={true}
            value={balanco.ativoNaoCirculante}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.4 Aluguel
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="aluguel"
            disabled={true}
            value={balanco.aluguel}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function ImobilizadosAndNaoCirculante() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <strong>1.2.1 Imobilizados</strong>
          <TextField
            className={classes.textField}
            size="small"
            id="imobilizados"
            disabled={true}
            value={balanco.imobilizados}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.2 Passivo Não Circulante</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            id="passivoNaoCirculante"
            value={balanco.passivoNaoCirculante}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function EquipamentosAndFinanciamentos() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.2.1.1 Equipamentos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="equipamentos"
            disabled={true}
            value={balanco.equipamentos}
          />
        </Grid>
        <Grid item xs={4}>
          2.2.1 Financiamentos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="financiamentos"
            disabled={true}
            value={balanco.financiamentos}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function MoveisAndEmprestimos() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.2.1.2 Móveis e Utensílios
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={balanco.moveisUtensilios}
            id="moveisUtensilios"
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          2.2.2 Empréstimos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="emprestimos"
            value={balanco.emprestimos}
            disabled={true}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function VeiculosAndPatrimonio() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          1.2.1.3 Veículo
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="veiculo"
            value={balanco.veiculo}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>3.0 Patrimônio Liquido</strong>
          <TextField
            className={classes.textField}
            size="small"
            id="patrimonioLiquido"
            disabled={true}
            value={balanco.patrimonioLiquido}
            disabled={true}
          />
        </Grid>
      </React.Fragment>
    );
  }

  function CapitalSocial() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
            3.1 Capital social
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            id="capitalSocial"
            value={balanco.capitalSocial}
            disabled={true}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
      <Fragment>
        <Container className={classes.container} maxWidth="ls">
          <form>
            <div className={classes.root}>
              <Grid container spacing={1} >
                <Grid container item xs={12} spacing={3} justify="center">
                  <AtivoAndPassivo />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <Circulante />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <CaixaAndFornecedores />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <ContasAndSalarios />
                </Grid> 
                <Grid container item xs={12} spacing={3} justify="center">
                  <EstoqueAndImpostos />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <NaoCirculanteAndAluguel />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <ImobilizadosAndNaoCirculante />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <EquipamentosAndFinanciamentos />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <MoveisAndEmprestimos />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <VeiculosAndPatrimonio />
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                  <CapitalSocial />
                </Grid>
              </Grid>
            </div>
          </form>
        </Container>
    </Fragment>
  );
}