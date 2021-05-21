import React from 'react';
import CustomButton from './customButton'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    borderRadius: "3%",
    alignSelf: "center",
    verticalAlign: "middle",
    marginTop: "10px",
    maxInlineSize: "fit-content",
    paddingTop: "15px",
    paddingBottom: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  general: {
    padding: theme.spacing(3),
    textAlign: "center",
    paddingLeft: "30%",
    paddingRight: "30%"
  },
}));

function TestStart(props) { 
  const classes = useStyles();

  return (   
    <Grid container id='iniciowais' justify="center">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" component="h2">
            {props.name}
          </Typography>
          <br/>
          <Typography variant="body1" component="h6">
            Vas a aplicar la prueba de {props.name} al paciente:
          </Typography>
          <Typography variant="body1" component="h6">Nombre Genérico</Typography>
          <Typography variant="body1" component="h6">Que tiene una edad de:</Typography>
          <Typography variant="body1" component="h6">X años y W meses</Typography>
        </CardContent>

        <CardActions>
          <Grid container justify="center">
            <CustomButton
              msj="Empezar"
              callback={props.change}
            ></CustomButton>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TestStart;
