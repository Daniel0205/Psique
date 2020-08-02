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

let aphasias = ["Paresia de miembro superior","Oftalmoplegia","Paralisis facial","Disartria"]

function Conteo(props) {
    const [state,setState]= useState("intro")

    const classes = useStyles();  

    if(state==="intro"){
        return(
            <IntroTest
                test={"Prueba de conteo: 1 Punto"}
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
          })}> Cuente de 1 a 20...</h1>
            {props.type==="doctor"?
            <div>            
                <CustomButton
                msj="Correcto"
                callback={()=>props.next(1,1)}
                ></CustomButton>
                <CustomButton
                msj="Incorrecto"
                callback={()=>props.next(1,0)}
                ></CustomButton>
                <hr />
                <p>Indique si se presenta alguno de los siguientes eventos:</p>
                
                {aphasias.map((x,i)=><CustomButton
                key={i}
                msj={x}
                callback={()=>props.aphasias.push([x,props.seconds])}
                ></CustomButton>)}
            </div>:null}
        </div>)
    }
}


export default Conteo;
  
