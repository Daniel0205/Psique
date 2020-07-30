import React,{useState} from 'react';
import CustomButton from '../../../components/customButton'
import IntroTest from '../introTest';

function Denominacion(props) {
    const [state,setState]= useState("intro")

    function getWidth(){
        if(props.type==="doctor") return "100%"
        switch (props.stimuli) {
          case 1:
            return "100%"
          case 2:
          case 3:
            return "50%"
          case 4:
            return "70%"
          case 5:
            return "100%"
          case 6:
            return "80%"
        
          default:
            break;
        }
      }

    if(state==="intro"){
      return(
          <IntroTest
              test={"Prueba de Denominacion: 6 Puntos"}
              socket={props.socket}
              callback={()=>setState("conteo")}
              type={props.type}
          />)
    }
    else{ 
    
      return(<div>
          <img
          alt={"Estimulo #"+props.stimuli}      
          width={getWidth()}
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
  
