import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
    div:{
      height: "80vh",
      paddingTop: "15%",
    }
  });

const instrucciones= ["EN LA IMAGEN HAY UN ANCIANO?","EN LA IMAGEN HAY UN CIRCULO?","EN LA IMAGEN HAY UN CARRO?","EN LA IMAGEN HAY UN AVION?"]

function Instrucciones(props) {
    const [state,setState]= useState("intro")
    const classes = useStyles(); 

    if(state==="intro"){
        return(
            <IntroTest
                test={"Prueba de seguimiento de instrucciones: 6 Puntos"}
                socket={props.socket}
                callback={()=>setState("conteo")}
                type={props.type}
            />)
    }
    else{ 
        return(<div className={clsx({
            [classes.div]:props.type==='paciente'
          })}>
            {props.type==="paciente"?<img
            alt={"Estimulo #"+props.stimuli}      
            width="100%"
            src={require('../../../assets/estimulos/wada/instruc.png')}
            />:null}
            {props.type==="doctor"?
            <div>
                <h1>{props.stimuli+". "+instrucciones[props.stimuli-1]}</h1>
                <h1>{props.stimuli===3 ||props.stimuli===0 ? "Respuesta correcta: Si":"Respuesta correcta: No"}</h1>
                <CustomButton
                msj="Correcto"
                callback={()=>props.next(4,1)}
                ></CustomButton>
                <CustomButton
                msj="Incorrecto"
                callback={()=>props.next(4,0)}
                ></CustomButton>
            </div>:null}
        </div>)
    }
}


export default Instrucciones;
  
