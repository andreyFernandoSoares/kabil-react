import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Menu, SwipeableDrawer } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import { useSnackbar } from 'notistack';
import BalancoJogador from './BalancoJogador';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    }
  }));

export default function BarraDeNavegacao( { tipo } ) {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [openDialogCodigo, setOpenDialogCodigo] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [codigoSala, setCodigoSala] = React.useState('');
  const [codigoSalaAux, setCodigoSalaAux] = React.useState('');
  const [openDialogBalanco, setOpenDialogBalanco] = React.useState(false);
  const [state, setState] = React.useState({
    left: false
  });
  const { enqueueSnackbar }  = useSnackbar();
  const usuarioId = localStorage.getItem('ID_USER');

  const headers = {
    'Authorization': localStorage.getItem('TOKEN_KEY')
  }
  
  useEffect(() => {
    buscaCodigo();
  }, [codigoSalaAux]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialogCodigo = () => {
    setOpenDialogCodigo(true);
  };

  const handleCloseDialogCodigo = () => {
    setOpenDialogCodigo(false);
  };

  const handleOpenDialogBalanco = () => {
    setOpenDialogBalanco(true);
  };

  const handleCloseDialogBalanco = () => {
    setOpenDialogBalanco(false);
  };

  const direcionarParaPagina = (texto) => {
    switch(texto) {
      case 'Atividades':
        history.push('/atividades');
        break;
      case 'Admin':
        history.push('/admin');
        break;
      case 'Balanço Patrimonial':
        history.push("/balanco");
        break;
      case 'Ranking':
        history.push("/dre");
        break;
      case 'Login':
        if (tipo == "admin")
          history.push('/login');
        else
          history.push('/inicio');  
        break;
      default:
        break;
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div>
      <List>
        {['Atividades', 'Balanço Patrimonial', 'Ranking'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon onClick={(event) => {
                  event.preventDefault();
                  direcionarParaPagina(text);
            }}>
              {
              text === 'Atividades' ? 
                <AccessibilityIcon /> 
                : text === 'Balanço Patrimonial' ? <ListAltIcon />
                : <InsertChartIcon />
              }
            </ListItemIcon>
            <ListItemText primary={text} onClick={(event) => {
                event.preventDefault();
                direcionarParaPagina(text);
              }}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const buscaCodigo = async () => {
    setTimeout(() => {
      api.get(`/sala/${usuarioId}`, { headers: headers })
      .then(({ data }) => {
        setCodigoSala(data)
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
      });
    }, 1000);
  }

  const criaSala = async () => {
    setTimeout(() => {
      api.post(`/sala/${usuarioId}`, {}, { headers: headers })
      .then(({ data }) => {
        setCodigoSalaAux(data);
        enqueueSnackbar("Sua sala está ativa! Seu codigo é "+data, {
            variant: "success"
        });
      })
      .catch((error) => {
          console.log("error");
          console.log(error);
          enqueueSnackbar("Você já possui uma sala ativa!", {
              variant: "error"
          });
      });
    }, 1000);
    handleMenuClose();
  }

  const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('ID_USER');
    handleMenuClose();
    direcionarParaPagina("Login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {tipo == 'admin' ? (
        codigoSala == '' ?
          (
            <MenuItem onClick={criaSala}>Gerar Sala</MenuItem>
          ) : (
            <MenuItem onClick={handleOpenDialogCodigo}>Visualizar código</MenuItem>
          )
      ) : <MenuItem onClick={handleOpenDialogBalanco}>Balanço Patrimonial</MenuItem> }
      <MenuItem onClick={logout}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge color="secondary">
            <HelpIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
        {/* ----- Inicio nav e menu ------- */}
        <AppBar position="static">
            <Toolbar>
                <div>
                {tipo == 'admin' ? ( ['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                    </React.Fragment>
                ))): null }
                </div>
                <Typography className={classes.title} variant="h6" noWrap onClick={(event) => {
                      event.preventDefault();
                      direcionarParaPagina("Admin");
                }}>
                  Kabil
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge color="secondary" onClick={handleClickOpen}>
                    <HelpIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        {/* ----- Fim nav e menu ------- */}
        {renderMobileMenu}
        {renderMenu}

        {/* ------ Inicio Dicas ----- */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Como jogar"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Jogando. Capaz gurizedo tem que se top dos game ta ligado ...
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Sair
            </Button>
            </DialogActions>
        </Dialog>
        {/* ------ Fim Dicas ----- */}


        {/* ------ Inicio Codigo ----- */}        
        <Dialog
            open={openDialogCodigo}
            onClose={handleCloseDialogCodigo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Aqui está o seu código!"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Use este código para distribuir aos jogadores e se divirta, seu código é: "+codigoSala}
                
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialogCodigo} color="primary" autoFocus>
                Sair
            </Button>
            </DialogActions>
        </Dialog>
        {/* ------ Fim Codigo ----- */}


        {/* ------ Inicio Balanco Patrimonial ----- */}        
        <Dialog
            open={openDialogBalanco}
            onClose={handleCloseDialogBalanco}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Balanço Patrimonial"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <BalancoJogador />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialogBalanco} color="primary" autoFocus>
                Sair
            </Button>
            </DialogActions>
        </Dialog>
        {/* ------ Fim Balanco Patrimonial ----- */}
    </div>
  )
}