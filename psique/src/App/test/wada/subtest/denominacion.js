import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  div:{
    height: "80vh",
    paddingTop: "10%",
  },
  img:{
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function Denominacion(props) {
    const [state,setState]= useState("intro")

    const classes = useStyles();  

    if(state==="intro"){
      return(
          <IntroTest
              test={"Prueba de denominacion: 6 Puntos"}
              socket={props.socket}
              callback={()=>setState("conteo")}
              type={props.type}
          />)
    }
    else{ 
    
      return(<div className={clsx({
        [classes.div]:props.type==='paciente'
      })}>
          <img
          className={classes.img}
          alt={"Estímulo #"+props.stimuli}      
          src={require('../../../assets/estimulos/wada/'+props.stimuli+".jpeg")}
          />
          {props.type==="doctor"?
          <div>
            <CustomButton
              msj="Correcto"
              callback={()=>props.next(6,1)}
              ></CustomButton>
              <CustomButton
              msj="Incorrecto"
              callback={()=>props.next(6,0)}
              ></CustomButton>
          </div>:null}
        </div>)
    }
}


export default Denominacion;
  
