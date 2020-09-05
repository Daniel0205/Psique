import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  div:{
      fontSize: "xxx-large"
  },
  h1:{
      paddingTop: "20%"
  }
});

const lectura= ["OSCURO","LA LLAVE DEL CARRO"]

function Lectura(props) {
  const [state,setState]= useState("intro")
  const classes = useStyles();  

  if(state==="intro"){
    return(
        <IntroTest
            test={"Prueba de Lectura: 2 Puntos"}
            socket={props.socket}
            callback={()=>setState("conteo")}
            type={props.type}
        />)
}
  else{ 
    
    return(<div className={clsx({
        [classes.div]:props.type==='paciente'
      })}>
        <h1 className={clsx({
            [classes.h1]:props.type==='paciente'
          })}>{lectura[props.stimuli-1]}</h1>
        {props.type==="doctor"?
        <div>
          <CustomButton
            msj="Correcto"
            callback={()=>props.next(2,1)}
            ></CustomButton>
            <CustomButton
            msj="Incorrecto"
            callback={()=>props.next(2,0)}
            ></CustomButton>
        </div>:null}
      </div>)
  }
}


export default Lectura;
  
