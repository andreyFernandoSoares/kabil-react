import React, { Fragment } from 'react';
import { Button, Container, CssBaseline, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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

export default function Formularios( {atividade, gravarJogada} ) {
    const classes = useStyles();
    const [valor, setValor] = React.useState(0);
    const [valorAPrazo, setValorAPrazo] = React.useState(0);
    const [passivo, setPassivo] = React.useState('');
    const [ativo, setAtivo] = React.useState('');
    const { enqueueSnackbar }  = useSnackbar();

    const handlePassivoChange = (event) => {
        setPassivo(event.target.value);
      };
    
      const handleAtivoChange = (event) => {
        setAtivo(event.target.value);
      };

    function montaDados() {
        if (valor >= atividade.valor) {
            let dados = {
                "ativo": ativo,
                "passivo": passivo,
                "valor": valor,
                "valorAPrazo": valorAPrazo
            }
            setValor(0);
            setValorAPrazo(0);
            gravarJogada(dados);
        } else {
            enqueueSnackbar("Valor não pode ser meneor que o enunciado!", {
                variant: "error"
            });
        }
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
                                label="Valor a vista"
                                name="valor"
                                autoComplete="valor"
                                type="number"
                                value={valor}
                                onChange={(event) => {setValor(event.target.value);}}
                                autoFocus
                            />

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="valorAPrazo"
                                label="Valor a prazo"
                                name="valorAPrazo"
                                autoComplete="valor"
                                type="number"
                                value={valorAPrazo}
                                onChange={(event) => {setValorAPrazo(event.target.value);}}
                                autoFocus
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