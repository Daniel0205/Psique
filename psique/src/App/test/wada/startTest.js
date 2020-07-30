import React, {useState,useEffect} from 'react';
import CustomButton from '../../components/customButton'
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import update from 'react-addons-update';
import FormHelperText from '@material-ui/core/FormHelperText';
import TestStart from '../../components/testStart'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    h1: {
      fontSize: "200%",
      paddingTop: "20%"
    },
    root:{
      textAlign:"center"
    },
    video:{
      width: "90%",
      maxWidth: "300px"
    }
});

let lobulo = "Derecho"  

function ResultsWada(props) {
    const [state, setState] = useState(props.state);
    
    const classes = useStyles();

    useEffect(()=>setState(props.state),[props.state])

    function join(typeIn){ 
        props.socket.emit('join', { type:typeIn ,test:"1111" }, (error) => {
            if(error) {
                alert(error);
            }
        });
        props.setType(typeIn)
    }
    
    function bodyIntro(){
      
        switch (state) {
          case "intro":
           return( <>
              <h1>Ingresar como:</h1>
              
              <CustomButton
                msj="Doctor"
                callback={()=>join("doctor")}
                ></CustomButton>
    
              <CustomButton
                msj="Paciente"
                callback={()=>join("paciente")}
              ></CustomButton>
            </>)   
          case "waiting":
            if(props.type==="doctor")return<div className={classes.h1}><h1>Esperando al usuario paciente </h1></div>
            else return<div className={classes.h1}><h1>Esperando al usuario doctor </h1></div>
           
          case "waiting start":
            return<div className={classes.h1}><h1>Esperando que el doctor inicie la prueba </h1></div>
          
          case "fin":
            props.stream.getTracks().forEach(function(track) {
              track.stop();
            });
            return<div className={classes.h1}><h1>Fin de la Prueba</h1></div>
        
          case "select":
            return(<div>
              <h1>Test de Wada</h1>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Selecciona las pruebas a aplicar:</FormLabel>
                <FormGroup>
                  {props.selectedTest.map((x,index)=>
                    <FormControlLabel
                      key={index}
                      control={<Checkbox checked={x} color="primary" 
                      onChange={(event)=>props.setSelectedTest(update(props.selectedTest,{
                        [index]: {
                          $set: event.target.checked
                        }}))
                        }/>}
                      label={props.test[index]}
                    />
                  )}
                </FormGroup>
                {props.selectedTest.findIndex(x=>x)===-1?<FormHelperText>Debe seleccionar al menos una prueba</FormHelperText>:null}
              </FormControl>
              <CustomButton
              msj="Siguiente"
              callback={()=>setState("start")}
              disabled={props.selectedTest.findIndex(x=>x)===-1}
              ></CustomButton>
            </div>)
            case "brain":
              return(<div>
                <h1>Test de Wada</h1>
                <p>Seleccione el lobulo donde se aplicara el propofol:</p>
                <CustomButton
                  msj="Lobulo Derecho"
                  callback={()=>{
                    lobulo="Derecho"
                    setState("select")
                  }}
                  ></CustomButton>
    
                <CustomButton
                  msj="Lobulo Izquierdo"
                  callback={()=>{
                    lobulo="Izquierdo"
                    setState("select")
                  }}
                ></CustomButton>
                <CustomButton
                  msj="Evaluacion Preliminar"
                  callback={()=>{
                    lobulo="Preliminar"
                    setState("select")
                  }}
                ></CustomButton>
              </div>)
            case "start":
              return(<TestStart
                name={"Wada-"+lobulo}
                change={props.changeTest}
              ></TestStart>)
                
            default:
                break;
        }
    }

    return(bodyIntro())
}


export default ResultsWada;
  
