import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1), 
    backgroundColor: "#017F8D",   
    "&:hover":{
      backgroundColor: "#7DC545",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },    
  },
}));


export default function CustomButton(props) {
  const classes = useStyles();

  if(props.disabled){
    return (
      <div>
          <Button variant="contained" color="primary"
          disabled
          onClick={props.callback}
          className={classes.margin}>
           {props.msj}
          </Button>
      </div>
    );
  }
  else{
    return (
      <div>
          <Button variant="contained" color="primary"
          onClick={props.callback}
          className={classes.margin}>
           {props.msj}
          </Button>
      </div>
    ); 
  }
  
}