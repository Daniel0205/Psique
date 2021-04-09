import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1), 
    backgroundColor: "#017F8D",
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    alignSelf: "center",
    textTransform: "none",
  },
  divButtonStyle: {
    alignSelf: "center",
  }
}));


export default function WaisWiscReturnButton(props) {
  const classes = useStyles();

  if(props.disabled){
    return (
      <div>
        <Button variant="contained" color="primary"
          disabled
          onClick={props.callback}
          className={classes.buttonStyle}>
           {props.msj}
        </Button>
      </div>
    );
  }
  else{
    return (
      <div className={classes.divButtonStyle}>
        <Button variant="contained" color="primary"
        onClick={props.callback}
        className={classes.buttonStyle}>
          {props.msj}
        </Button>
      </div>
    ); 
  }
  
}