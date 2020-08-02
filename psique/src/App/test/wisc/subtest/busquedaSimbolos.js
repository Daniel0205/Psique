import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import TestsTimer from '../../../components/TestsTimer'
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

let busquedaA = false; // true A; false B
const TESTDURATION = 120;

const useStyles = makeStyles({
  table: {
    alignSelf: "center",
  },
  textfield:{
    width:"20%"
  },
  snackbarStyle: {
    color: "black",
    alignSelf: "center",
    display: "inline-flex",
    backgroundColor: '#FFF4E5',
    width: '40%',
  },
  iconStyle:{
    color: '#FFA117',
    alignSelf: "center",
    verticalAlign: "middle",
  },
});


function BusquedaSimbolos() {
  var [state,setState] = useState("instruccion");
  var [result,setResult] = useState();

  var [pag4C, setPag4C] = useState();
  var [pag4I, setPag4I] = useState();
  var [pag4Alert, setPag4Alert] = useState(false);

  var [pag5C, setPag5C] = useState();
  var [pag5I, setPag5I] = useState();
  var [pag5Alert, setPag5Alert] = useState(false);

  var [pag6C, setPag6C] = useState();
  var [pag6I, setPag6I] = useState();
  var [pag6Alert, setPag6Alert] = useState(false);

  var [pag8C, setPag8C] = useState();
  var [pag8I, setPag8I] = useState();
  var [pag8Alert, setPag8Alert] = useState(false);

  var [pag9C, setPag9C] = useState();
  var [pag9I, setPag9I] = useState();
  var [pag9Alert, setPag9Alert] = useState(false);

  var [pag10C, setPag10C] = useState();
  var [pag10I, setPag10I] = useState();
  var [pag10Alert, setPag10Alert] = useState(false);

  var [pag11C, setPag11C] = useState();
  var [pag11I, setPag11I] = useState();
  var [pag11Alert, setPag11Alert] = useState(false);

  const classes = useStyles();

  function testInit(simbolos){
    setState('registro');
    if(simbolos==='A'){
      busquedaA = true;
    }else{
      busquedaA = false;
    }    
  }

  function validateAnswers(){
    var total = 0;
    if(busquedaA){
      if(pag4C === undefined || pag4C.isNaN || pag4C === null || pag4C === ''){ setPag4C(0) } else{ total += parseInt(pag4C) }
      if(pag4I === undefined || pag4I.isNaN || pag4I === null || pag4I === ''){ setPag4I(0) } else{ total -= parseInt(pag4I) }

      if(pag5C === undefined || pag5C.isNaN || pag5C === null || pag5C === ''){ setPag5C(0) } else{ total += parseInt(pag5C) }
      if(pag5I === undefined || pag5I.isNaN || pag5I === null || pag5I === ''){ setPag5I(0) } else{ total -= parseInt(pag5I) }

      if(pag6C === undefined || pag6C.isNaN || pag6C === null || pag6C === ''){ setPag6C(0) } else{ total += parseInt(pag6C) }
      if(pag6I === undefined || pag6I.isNaN || pag6I === null || pag6I === ''){ setPag6I(0) } else{ total -= parseInt(pag6I) }

    }else{
      if(pag8C === undefined || pag8C.isNaN || pag8C === null || pag8C === ''){ setPag8C(0) } else{ total += parseInt(pag8C) }
      if(pag8I === undefined || pag8I.isNaN || pag8I === null || pag8I === ''){ setPag8I(0) } else{ total -= parseInt(pag8I) }

      if(pag9C === undefined || pag9C.isNaN || pag9C === null || pag9C === ''){ setPag9C(0) } else{ total += parseInt(pag9C) }
      if(pag9I === undefined || pag9I.isNaN || pag9I === null || pag9I === ''){ setPag9I(0) } else{ total -= parseInt(pag9I) }

      if(pag10C === undefined || pag10C.isNaN || pag10C === null || pag10C === ''){ setPag10C(0) } else{ total += parseInt(pag10C) }
      if(pag10I === undefined || pag10I.isNaN || pag10I === null || pag10I === ''){ setPag10I(0) } else{ total -= parseInt(pag10I) }

      if(pag11C === undefined || pag11C.isNaN || pag11C === null || pag11C === ''){ setPag11C(0) } else{ total += parseInt(pag11C) }
      if(pag11I === undefined || pag11I.isNaN || pag11I === null || pag11I === ''){ setPag11I(0) } else{ total -= parseInt(pag11I) }
    }
    return total;
  }

  function ShowResults(){
    var varTotal = validateAnswers();    

    if(varTotal < 0){
      varTotal = 0;
    }

    setResult(varTotal);
    setState("terminado");
  }

  function getResult(){
    return result;
  }

  /*  ChangeValues Function
  * $newValue - The new value for the fieldNumber
  * $correct - if the new value is for fieldNumber correctAnswer or not (wrongAnswer)
  * $fieldNumber - The number of the field that will change
  */
  function ChangeValues(newValue, correct, fieldNumber) {
    var newNumberValue = parseInt(newValue);
    var controlVar;
    if(newValue !== undefined && !(newNumberValue.isNaN) && newValue !== null && newValue !== ''){
      switch(fieldNumber){
        case 4:
          if(correct){
            setPag4C(newValue);
            controlVar = parseInt(pag4I);
            if(pag4I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag4Alert(true); } else{ setPag4Alert(false); }
          }else{
            setPag4I(newValue);
            controlVar = parseInt(pag4C);
            if(pag4C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag4Alert(true); } else{ setPag4Alert(false); }
          }
        break;

        case 5:
          if(correct){
            setPag5C(newValue);
            controlVar = parseInt(pag5I);
            if(pag5I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag5Alert(true); } else{ setPag5Alert(false); }
          }else{
            setPag5I(newValue);
            controlVar = parseInt(pag5C);
            if(pag5C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag5Alert(true); } else{ setPag5Alert(false); }
          }
        break;

        case 6:
          if(correct){
            setPag6C(newValue);
            controlVar = parseInt(pag6I);
            if(pag6I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag6Alert(true); } else{ setPag6Alert(false); }
          }else{
            setPag6I(newValue);
            controlVar = parseInt(pag6C);
            if(pag6C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag6Alert(true); } else{ setPag6Alert(false); }
          }
        break;


        case 8:
          if(correct){
            setPag8C(newValue);
            controlVar = parseInt(pag8I);
            if(pag8I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag8Alert(true); } else{ setPag8Alert(false); }
          }else{
            setPag8I(newValue);
            controlVar = parseInt(pag8C);
            if(pag8C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag8Alert(true); } else{ setPag8Alert(false); }
          }
        break;

        case 9:
          if(correct){
            setPag9C(newValue);
            controlVar = parseInt(pag9I);
            if(pag9I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag9Alert(true); } else{ setPag9Alert(false); }
          }else{
            setPag9I(newValue);
            controlVar = parseInt(pag9C);
            if(pag9C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag9Alert(true); } else{ setPag9Alert(false); }
          }
        break;

        case 10:
          if(correct){
            setPag10C(newValue);
            controlVar = parseInt(pag10I);
            if(pag10I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag10Alert(true); } else{ setPag10Alert(false); }
          }else{
            setPag10I(newValue);
            controlVar = parseInt(pag10C);
            if(pag10C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag10Alert(true); } else{ setPag10Alert(false); }
          }
        break;

        case 11:
          if(correct){
            setPag11C(newValue);
            controlVar = parseInt(pag11I);
            if(pag11I === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag11Alert(true); } else{ setPag11Alert(false); }
          }else{
            setPag11I(newValue);
            controlVar = parseInt(pag11C);
            if(pag11C === undefined || controlVar === undefined || controlVar.isNaN){ controlVar = 0; }
            if(newNumberValue+controlVar > 15){ setPag11Alert(true); } else{ setPag11Alert(false); }
          }
        break;

        default:
        break;
      }
    }
  }

  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Búsqueda de símbolos</h1>
            <b>Intrucciones generales:</b>
            <p>Seleccione la opción según sea el caso</p>
            
            <CustomButton
              msj="Aplicación de subPrueba"
              callback={()=>setState("aplicacion")}
            ></CustomButton>
            <CustomButton
              msj="Registro de resultados"
              callback={()=>setState("seleccion")}
            ></CustomButton>
          </div>
        )

      case "aplicacion":
        return(
          <div>
            <h1>Búsqueda de símbolos: Guía de aplicación</h1>
            <p>Según la edad o condición del paciente se le entrega la hoja de aplicación indicada a continuación </p>
            <p> </p>
            <p>Pacientes de edad 6-7 años o con sospechas de discapacidad intelectual: <b> Reactivos de muestra de Búsqueda de símbolos A, reactivos de práctica, después reactivos de prueba </b></p>
            <p>Pacientes de edad 8-16: <b> Reactivos de muestra de Búsqueda de símbolos B, reactivos de práctica, después reactivos de prueba </b></p>
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

        case "seleccion":
        return(
          <div>
            <h1>Busqueda de simbolos</h1>
            <p>Seleccione el reactivo que se le aplicó al paciente </p>
            <p>Pacientes de edad 6-7 años o con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Busqueda de simbolos A"
              callback={()=>testInit('A')}
            ></CustomButton>            
            
            <p>Pacientes de edad 8-16:</p>
            <CustomButton
              msj="Busqueda de simbolos B"
              callback={()=>testInit('B')}
            ></CustomButton>
          </div>
        )

        case "registro":
          if(busquedaA){
            return(
              <div>
                <h1>Búsqueda de Símbolos</h1>
                <b>Intrucciones:</b>
                <p>Registre las calificaciones obtenidas por el paciente en la subprueba</p>

                <div className={classes.fields}>
                  <h3> Página 4 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag4C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 4)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag4I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 4)}
                    />
                    &nbsp;  &nbsp;
                    {pag4Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>                  
                </div>                

                <div className={classes.fields}>
                  <h3> Página 5 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag5C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 5)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag5I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 5)}
                    />
                    &nbsp;  &nbsp;
                    {pag5Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <div className={classes.fields}>
                  <h3> Página 6 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag6C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 6)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag6I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 6)}
                    />
                    &nbsp;  &nbsp;
                    {pag6Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <CustomButton
                  msj="Calificar"
                  callback={()=>ShowResults()}
                ></CustomButton>
              </div>
              )
          }else{
            return(
              <div>
                <h1>Búsqueda de Símbolos</h1>
                <b>Intrucciones:</b>
                <p>Registre las calificaciones obtenidas por el paciente en la subprueba</p>

                <div className={classes.fields}>
                  <h3> Página 8 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag8C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 8)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag8I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 8)}
                    />
                    &nbsp;  &nbsp;
                    {pag8Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <div className={classes.fields}>
                  <h3> Página 9 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag9C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 9)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag9I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 9)}
                    />
                    &nbsp;  &nbsp;
                    {pag9Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <div className={classes.fields}>
                  <h3> Página 10 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag10C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 10)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag10I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 10)}
                    />
                    &nbsp;  &nbsp;
                    {pag10Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <div className={classes.fields}>
                  <h3> Página 11 </h3>
                  <div className={classes.field}>
                    <TextField
                      className={classes.textfield}
                      label={"Correctas"}
                      type="number"
                      defaultValue={pag11C}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, true, 11)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag11I}
                      inputProps={{ min:0, max:15 }}
                      variant="outlined"
                      onChange={(x)=>ChangeValues(x.target.value, false, 11)}
                    />
                    &nbsp;  &nbsp;
                    {pag11Alert ?
                      <div> 
                        <br/>
                        <Grid container className={classes.snackbarStyle} justify="center" spacing={1}>
                            <WarningIcon className={classes.iconStyle}/>
                            <p> Por favor revisa los valores</p>
                        </Grid>
                      </div>
                    : <div/>}
                  </div>
                </div>

                <CustomButton
                  msj="Calificar"
                  callback={()=>ShowResults()}
                ></CustomButton>
              </div>
            )
          }
        
      case "terminado":
        return(
          <Results
            name="Búsqueda de Símbolos"
            result={getResult()}
            callback={()=>setState("registro")}
            url="WISC-selection"
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

export default BusquedaSimbolos;
