import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';

const verbal= ["CIERRE LOS OJOS","SAQUE LA LENGUA","ABRA Y CIERRE LA MANO"]


function Verbales(props) {
  const [state,setState]= useState("intro")

  if(state==="intro"){
    return(
        <IntroTest
            test={"Seguimiento de instrucciones verbales: 3 puntos"}
            socket={props.socket}
            callback={()=>setState("conteo")}
            type={props.type}
        />)
}
  else{ 
    return(<div >        
        {props.type==="doctor"?
        <div>
          <h1>{verbal[props.stimuli-1]}</h1>
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


export default Verbales;
  
