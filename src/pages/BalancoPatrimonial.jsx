import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import api from '../services/api';
import BarraDeNavegacao from './components/BarraDeNavegacao';
import { useSnackbar } from 'notistack';

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
  const [ativo, setAtivo] = React.useState(0);
  const [passivo, setPassivo] = React.useState(0);
  const [passivoCirculante, setPassivoCirculante] = React.useState(0);
  const [ativoCirculante, setAtivoCirculante] = React.useState(0);
  const [caixa, setCaixa] = React.useState(0);
  const [fornecedores, setFornecedores] = React.useState(0);
  const [contasAReceber, setContasAReceber] = React.useState(0);
  const [salarios, setSalarios] = React.useState(0);
  const [estoque, setEstoque] = React.useState(0);
  const [impostos, setImpostos] = React.useState(0);
  const [ativoNaoCirculante, setAtivoNaoCirculante] = React.useState(0);
  const [aluguel, setAluguel] = React.useState(0);
  const [imobilizados, setImobilizados] = React.useState(0);
  const [equipamentos, setEquipamentos] = React.useState(0);
  const [passivoNaoCirculante, setPassivoNaoCirculante] = React.useState(0);
  const [financiamentos, setFinanciamentos] = React.useState(0);
  const [moveisUtensilios, setMoveisUtensilios] = React.useState(0);
  const [emprestimos, setEmprestimos] = React.useState(0);
  const [veiculo, setVeiculo] = React.useState(0);
  const [patrimonioLiquido, setPatrimonioLiquido] = React.useState(0);
  const [capitalSocial, setCapitalSocial] = React.useState(0);
  const [auxBalanco, setAuxBalanco] = React.useState({});
  const [balanco, setBalanco] = React.useState({});
  const { enqueueSnackbar }  = useSnackbar();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('TOKEN_KEY')
  }

  // useEffect(() => {
  //   preencheBalanco();
  // }, [auxBalanco]);

  useEffect(() => {
    setAtivoCirculante(somaAtivoCirculante());
    setAtivo(somaAtivo());
  }, [caixa, contasAReceber, estoque]);

  useEffect(() => {
    setAtivoNaoCirculante(somaAtivoNaoCirculante());
    setImobilizados(somaAtivoNaoCirculante());
    setAtivo(somaAtivo());
  }, [equipamentos, moveisUtensilios, veiculo]);

  useEffect(() => {
    setPassivoCirculante(somaPassivoCirculante());
    setPassivo(somaPassivo());
  }, [fornecedores, salarios, impostos, aluguel]);

  useEffect(() => {
    setPassivoNaoCirculante(somaPassivoNaoCirculante());
    setPassivo(somaPassivo());
  }, [financiamentos, emprestimos]);

  function montaDados() {
    return {
      "id": balanco.id,
      "ativo": ativo,
      "passivo": passivo,
      "ativoCirculante": ativoCirculante,
      "passivoCirculante": passivoCirculante,
      "caixa": caixa,
      "fornecedores": fornecedores,
      "contasAReceber": contasAReceber,
      "salarios": salarios,
      "estoque": estoque,
      "impostos": impostos,
      "ativoNaoCirculante": ativoNaoCirculante,
      "aluguel": aluguel,
      "imobilizados": imobilizados,
      "passivoNaoCirculante": passivoNaoCirculante,
      "equipamentos": equipamentos,
      "financiamentos": financiamentos,
      "moveisUtensilios": moveisUtensilios,
      "emprestimos": emprestimos,
      "veiculo": veiculo,
      "patrimonioLiquido": patrimonioLiquido,
      "capitalSocial": capitalSocial
    }
  }

  function iniciaValores() {
    if (balanco !== null) {
      if (balanco.ativo !== null) 
        setAtivo(balanco.ativo);
      
      if (balanco.passivo !== null) 
        setPassivo(balanco.passivo);

      if (balanco.ativoCirculante !== null) 
        setAtivoCirculante(balanco.ativoCirculante);

      if (balanco.passivoCirculante !== null) 
        setPassivoCirculante(balanco.passivoCirculante);

      if (balanco.caixa !== null) 
        setCaixa(balanco.caixa);
      
      if (balanco.fornecedores !== null) 
        setFornecedores(balanco.fornecedores);
      
      if (balanco.contasAReceber !== null) 
        setContasAReceber(balanco.contasAReceber);

      if (balanco.salarios !== null) 
        setSalarios(balanco.salarios);
  
      if (balanco.estoque !== null) 
        setEstoque(balanco.estoque);

      if (balanco.impostos !== null) 
        setImpostos(balanco.impostos);

      if (balanco.ativoNaoCirculante !== null) 
        setAtivoNaoCirculante(balanco.ativoNaoCirculante);
      
      if (balanco.aluguel !== null) 
        setAluguel(balanco.aluguel);
      
      if (balanco.imobilizados !== null) 
        setImobilizados(balanco.imobilizados);
      
      if (balanco.passivoNaoCirculante !== null) 
        setPassivoNaoCirculante(balanco.passivoNaoCirculante);
      
      if (balanco.equipamentos !== null) 
        setEquipamentos(balanco.equipamentos);
      
      if (balanco.financiamentos !== null) 
        setFinanciamentos(balanco.financiamentos);
      
      if (balanco.moveisUtensilios !== null) 
        setMoveisUtensilios(balanco.moveisUtensilios);
      
      if (balanco.emprestimos !== null) 
        setEmprestimos(balanco.emprestimos);
      
      if (balanco.veiculo !== null) 
        setVeiculo(balanco.veiculo);
      
      if (balanco.patrimonioLiquido !== null) 
        setPatrimonioLiquido(balanco.patrimonioLiquido);
      
      if (balanco.capitalSocial !== null) 
        setCapitalSocial(balanco.capitalSocial);
    }
  }

  async function gravaBalanco() {
    let dados = montaDados();
    setTimeout(() => {
      api.put(`/balanco`, dados, { headers: headers })
      .then(({ data }) => {
        enqueueSnackbar("Balanço patrimonial alterado com sucesso!", {
          variant: "error"
        });
        setAuxBalanco({sucess: true})
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Falha ao alterar Balanço patrimonial !", {
              variant: "error"
          });
      });
    }, 1000);
  }

  async function preencheBalanco() {
    let usuarioId = localStorage.getItem('ID_USER');
    setTimeout(() => {
      api.get(`/balanco/${usuarioId}`, { headers: headers })
      .then(({ data }) => {
        console.log(data)
        setBalanco(data)
        //iniciaValores();
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

  function somaPassivo() {
    return somaPassivoCirculante() + somaPassivoNaoCirculante();
  }

  function somaPassivoNaoCirculante() {
    return parseFloat(financiamentos) + parseFloat(emprestimos);
  }

  function somaPassivoCirculante() {
    return parseFloat(fornecedores) + parseFloat(salarios) + parseFloat(impostos) + parseFloat(aluguel);
  }

  function somaAtivoCirculante() {
    return parseFloat(caixa) + parseFloat(contasAReceber) + parseFloat(estoque);
  }

  function somaAtivoNaoCirculante() {
    return parseFloat(equipamentos) + parseFloat(moveisUtensilios) + parseFloat(veiculo);
  }

  function somaAtivo() {
    return somaAtivoCirculante() + somaAtivoNaoCirculante();
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
            value={ativo}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.0 Passivo</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={passivo}
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
            value={ativoCirculante}
          />
        </Grid>
        <Grid item xs={4}>
        <strong>2.1 Passivo Circulante</strong>
        <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={passivoCirculante}
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
            type="number"
            value={caixa}
            onChange={(event) => {setCaixa(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.1 Fornecedores
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={fornecedores}
            onChange={(event) => {setFornecedores(event.target.value)}}
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
            type="number"
            value={contasAReceber}
            onChange={(event) => {setContasAReceber(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.2 Salários
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={salarios}
            onChange={(event) => {setSalarios(event.target.value)}}
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
            value={estoque}
            onChange={(event) => {setEstoque(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.3 Impostos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={impostos}
            onChange={(event) => {setImpostos(event.target.value)}}
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
            value={ativoNaoCirculante}
          />
        </Grid>
        <Grid item xs={4}>
          2.1.4 Aluguel
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={aluguel}
            onChange={(event) => {setAluguel(event.target.value)}}
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
            value={imobilizados}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>2.2 Passivo Não Circulante</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={passivoNaoCirculante}
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
            value={equipamentos}
            onChange={(event) => {setEquipamentos(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          2.2.1 Financiamentos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={financiamentos}
            onChange={(event) => {setFinanciamentos(event.target.value)}}
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
            value={moveisUtensilios}
            onChange={(event) => {setMoveisUtensilios(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          2.2.2 Empréstimos
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={emprestimos}
            onChange={(event) => {setEmprestimos(event.target.value)}}
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
            value={veiculo}
            onChange={(event) => {setVeiculo(event.target.value)}}
          />
        </Grid>
        <Grid item xs={4}>
          <strong>3.0 Patrimônio Liquido</strong>
          <TextField
            className={classes.textField}
            size="small"
            disabled={true}
            value={patrimonioLiquido}
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
            onClick={(event) => {event.preventDefault(); gravaBalanco();}}
            fullWidth>
            Gravar
          </Button>
        </Grid>
        <Grid item xs={4}>
            3.1 Capital social
          <TextField
            className={classes.textField}
            size="small"
            type="number"
            value={capitalSocial}
            onChange={(event) => {setCapitalSocial(event.target.value); setPatrimonioLiquido(event.target.value)}}
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