import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';

const repeticion= ["CEREBRO","PENSAMIENTO","LENGUAJE"]


function Repeticion(props) {
  const [state,setState]= useState("intro")

  if(state==="intro"){
    return(
        <IntroTest
            test={"Prueba de repeticion: 3 Puntos"}
            socket={props.socket}
            callback={()=>setState("conteo")}
            type={props.type}
        />)
}
  else{ 
    
    return(<div >
        {props.type==="doctor"?
        <div>
          <h1>{repeticion[props.stimuli-1]}</h1>
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


export default Repeticion;
  
