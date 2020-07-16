import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';

let busquedaA = false; // true A; false B

const useStyles = makeStyles({
  table: {
    alignSelf: "center",
  },
  textfield:{
    width:"20%"
  },
});


function BusquedaSimbolos() {
  var [state,setState] = useState("instruccion");
  var [result,setResult] = useState();

  var [pag4C, setPag4C] = useState();
  var [pag4I, setPag4I] = useState();

  var [pag5C, setPag5C] = useState();
  var [pag5I, setPag5I] = useState();

  var [pag6C, setPag6C] = useState();
  var [pag6I, setPag6I] = useState();

  var [pag8C, setPag8C] = useState();
  var [pag8I, setPag8I] = useState();

  var [pag9C, setPag9C] = useState();
  var [pag9I, setPag9I] = useState();

  var [pag10C, setPag10C] = useState();
  var [pag10I, setPag10I] = useState();

  var [pag11C, setPag11C] = useState();
  var [pag11I, setPag11I] = useState();

  const classes = useStyles();

  function testInit(simbolos){
    setState('registro');
    if(simbolos==='A'){
      busquedaA = true;
    }
  }

  function validateAnswers(){
    var total = 0;
    if(busquedaA){
      if(pag4C === undefined || pag4C.isNaN || pag4C === null){ setPag4C(0) } else{ total += parseInt(pag4C) }
      if(pag4I === undefined || pag4I.isNaN || pag4I === null){ setPag4I(0) } else{ total -= parseInt(pag4I) }

      if(pag5C === undefined || pag5C.isNaN || pag5C === null){ setPag5C(0) } else{ total += parseInt(pag5C) }
      if(pag5I === undefined || pag5I.isNaN || pag5I === null){ setPag5I(0) } else{ total -= parseInt(pag5I) }

      if(pag6C === undefined || pag6C.isNaN || pag6C === null){ setPag6C(0) } else{ total += parseInt(pag6C) }
      if(pag6I === undefined || pag6I.isNaN || pag6I === null){ setPag6I(0) } else{ total -= parseInt(pag6I) }

    }else{
      if(pag8C === undefined || pag8C.isNaN || pag8C === null){ setPag8C(0) } else{ total += parseInt(pag8C) }
      if(pag8I === undefined || pag8I.isNaN || pag8I === null){ setPag8I(0) } else{ total -= parseInt(pag8I) }

      if(pag9C === undefined || pag9C.isNaN || pag9C === null){ setPag9C(0) } else{ total += parseInt(pag9C) }
      if(pag9I === undefined || pag9I.isNaN || pag9I === null){ setPag9I(0) } else{ total -= parseInt(pag9I) }

      if(pag10C === undefined || pag10C.isNaN || pag10C === null){ setPag10C(0) } else{ total += parseInt(pag10C) }
      if(pag10I === undefined || pag10I.isNaN || pag10I === null){ setPag10I(0) } else{ total -= parseInt(pag10I) }

      if(pag11C === undefined || pag11C.isNaN || pag11C === null){ setPag11C(0) } else{ total += parseInt(pag11C) }
      if(pag11I === undefined || pag11I.isNaN || pag11I === null){ setPag11I(0) } else{ total -= parseInt(pag11I) }
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

            {/* AQUI VA EL COMPONENTE PARA EL CORNÓMETRO */}
            {/* AQUI VA EL COMPONENTE PARA EL CORNÓMETRO */}
            {/* AQUI VA EL COMPONENTE PARA EL CORNÓMETRO */}

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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag4C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag4I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag4I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag5C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag5I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag5I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag6C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag6I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag6I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag8C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag8I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag8I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag9C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag9I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag9I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag10C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag10I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag10I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag11C(x.target.value)}
                    />
                    &nbsp;  &nbsp;
                    <TextField
                      className={classes.textfield}
                      label={"Incorrectas"}
                      type="number"
                      defaultValue={pag11I}
                      inputProps={{ min:0 }}
                      variant="outlined"
                      onChange={(x)=>setPag11I(x.target.value)}
                    />
                    &nbsp;  &nbsp;                
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
