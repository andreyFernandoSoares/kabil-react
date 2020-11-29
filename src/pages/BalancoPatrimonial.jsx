import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import BarraDeNavegacao from './components/BarraDeNavegacao';

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

export default function BalancoPatrimonial() {
  const classes = useStyles();

  function AtivoAndPassivo() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <strong>1.0 Ativo</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.0 Passivo</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
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
            className={classes.textField}
            size="small"
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
        <strong>2.1 Passivo Circulante</strong>
        <TextField
            className={classes.textField}
            size="small"
            disabled={true}
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
            className={classes.textField}
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          2.1.1 Fornecedores
          <TextField
            className={classes.textField}
            size="small"
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
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          2.1.2 Salários
          <TextField
            className={classes.textField}
            size="small"
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
          />
        </Grid>
        <Grid item xs={4}>
          2.1.3 Impostos
          <TextField
            className={classes.textField}
            size="small"
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
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.4 Aluguel
          <TextField
            className={classes.textField}
            size="small"
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
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.2 Passivo Não Circulante</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
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
          />
        </Grid>
        <Grid item xs={4}>
          2.2.1 Financiamentos
          <TextField
            className={classes.textField}
            size="small"
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
          />
        </Grid>
        <Grid item xs={4}>
          2.2.2 Empréstimos
          <TextField
            className={classes.textField}
            size="small"
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
          />
        </Grid>
        <Grid item xs={4}>
          <strong>3.0 Patrimônio Liquido</strong>
          <TextField
            className={classes.textField}
            size="small"
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
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            fullWidth>
            Gravar
          </Button>
        </Grid>
        <Grid item xs={4}>
            3.1 Capital social
          <TextField
            className={classes.textField}
            size="small"
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
      <Fragment>
        <BarraDeNavegacao tipo={"admin"}/>

        <Container className={classes.container} maxWidth="ls">
          <Typography 
              gutterBottom 
              variant="h5" 
              component="h2"
              align="center"
              > Balanço Patrimonial 
          </Typography>

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