import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import TestsTimer from '../../../components/TestsTimer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textfield:{
    width:"20%"
  },
});

const TESTDURATION = 120;

function ClavesNumeros() {
  var [state,setState] = useState("instruccion");
  var [result,setResult] = useState();
  const classes = useStyles();

  function validateAnswers(){
    if(result === undefined || result.isNaN || result === null || result === ''){ setResult(0) }
  }

  function ShowResults(){
    validateAnswers();
    setState("terminado");
  }

  function getResult() {
    return result;
  }

  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Clave de números</h1>
            <b>Intrucciones generales:</b>
            <p>Seleccione la opción según sea el caso</p>
            
            <CustomButton
              msj="Aplicación de subPrueba"
              callback={()=>setState("aplicacion")}
            ></CustomButton>
            <CustomButton
              msj="Registro de resultados"
              callback={()=>setState("registro")}
            ></CustomButton>
          </div>
        )

      case "aplicacion":
        return(
          <div>
            <h1>Clave de números: Guia de aplicación</h1>
            <p> <b>Edad 16-89:</b> Aplicar items de demostración, items de ejemplo e items del test </p>
            <p>El temporizador sirve de ayuda para tomar el tiempo, inicie el tiempo una vez dadas las instrucciones de la prueba</p>
            <p>Recuerde al finalizar la prueba guardar el registro de cuanto fue el tiempo usado por el paciente (tiempo total = {TESTDURATION} segundos)</p>

            <br/>
            <TestsTimer duration={TESTDURATION}></TestsTimer>
            <br/>

            <CustomButton
              msj="Regresar a la subPrueba"
              callback={()=>setState("instruccion")}
            ></CustomButton>
          </div>
        )

        case "registro":          
          return(
            <div>
              <h1>Clave de números</h1>                
              <b>Intrucciones:</b>
              <p>Registre la calificación obtenida por el paciente en la prueba</p>    

              <TextField
                className={classes.textfield}
                label = "Puntuación del paciente"
                defaultValue={result}
                type="number"                    
                inputProps={{
                  min:0,
                  max:135,
                }}
                variant="outlined"
                onChange={(x)=>{setResult(x.target.value)}}
              /> 
              <br/> 

              <CustomButton
                msj="Terminar"
                callback={()=>ShowResults()}
              ></CustomButton>
            </div>
          )          
        
      case "terminado":
        return(
          <Results
            name="Claves de Numeros"
            result={getResult()}
            callback={()=>setState("registro")}
            url="WAIS-selection"
          ></Results>
        )

      default:
      break;
      }
    }

  return (
    <div>
      {content()}
    </div>
  );
}

export default ClavesNumeros;
