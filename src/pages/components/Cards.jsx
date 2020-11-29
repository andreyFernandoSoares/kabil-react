import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 645,
    padding: theme.spacing(3),
    margin: theme.spacing(2)
  },
  media: {
    height: 200,
  },
  box: {
      padding: theme.spacing(10)
  }
}));

export default function Cards() {
  const classes = useStyles();
  let history = useHistory();
  
  const direcionarPagina = (nome) => {
    switch(nome) {
        case 'Atividades':
            history.push("/atividades");
            break;
        case 'Balanco':
            history.push("/balanco");
            break;
        case 'Dre':
            history.push("/dre");
            break;
    }
  }

  return (
    <Fragment>
        <Box 
            component="div" 
            display="flex" 
            justifyContent="center"
            className={classes.box}
        >
            <Card className={classes.root}>
                <CardActionArea onClick={(event) => {
                    event.preventDefault();
                    direcionarPagina("Atividades");
                }}>
                    <CardMedia
                        className={classes.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Atividades
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Cadastre suas atividades!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


            <Card className={classes.root}>
                <CardActionArea onClick={(event) => {
                    event.preventDefault();
                    direcionarPagina("Balanco");
                }}>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Balanço Patrimonial
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Preencha seu Balanço Patrimonial!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


            <Card className={classes.root}>
                <CardActionArea onClick={(event) => {
                    event.preventDefault();
                    direcionarPagina("Dre");
                }}>
                    <CardMedia
                        className={classes.media}
                    >

                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Ranking de DRE's
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Ranking dos melhores DRE's nas partidas ministradas!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    </Fragment>
  );
}