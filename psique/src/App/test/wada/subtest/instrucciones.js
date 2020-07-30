import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';

const instrucciones= ["EN LA IMAGEN HAY UN ANCIANO?","EN LA IMAGEN HAY UN CIRCULO?","EN LA IMAGEN HAY UN CARRO?","EN LA IMAGEN HAY UN AVION?"]

function Instrucciones(props) {
    const [state,setState]= useState("intro")

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
        return(<div >
            {props.type==="paciente"?<img
            alt={"Estimulo #"+props.stimuli}      
            width="100%"
            src={require('../../../assets/estimulos/wada/instruc.png')}
            />:null}
            {props.type==="doctor"?
            <div>
                <h1>{instrucciones[props.stimuli]}</h1>
                <h1>{props.stimuli===3 ||props.stimuli===0 ? "Respuesta correcta: Si":"Respuesta correcta: No"}</h1>
                <CustomButton
                msj="Correcto"
                callback={()=>props.next(3,1)}
                ></CustomButton>
                <CustomButton
                msj="Incorrecto"
                callback={()=>props.next(3,0)}
                ></CustomButton>
            </div>:null}
        </div>)
    }
}


export default Instrucciones;
  
