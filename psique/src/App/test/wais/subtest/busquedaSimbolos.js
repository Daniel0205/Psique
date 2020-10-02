import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import TestsTimer from '../../../components/TestsTimer'
import { makeStyles } from '@material-ui/core/styles';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const useStyles = makeStyles({
  table: {
    alignSelf: "center",
  },
  textfield:{
    width:"20%"
  },
});

const TESTDURATION = 120;

function BusquedaSimbolos(props) {
  var [state,setState] = useState("instruccion");
  var [result,setResult] = useState();

  var [pag1C, setPag1C] = useState();
  var [pag1I, setPag1I] = useState();

  var [pag2C, setPag2C] = useState();
  var [pag2I, setPag2I] = useState();

  var [pag3C, setPag3C] = useState();
  var [pag3I, setPag3I] = useState();

  var [pag4C, setPag4C] = useState();
  var [pag4I, setPag4I] = useState();

  var [pag5C, setPag5C] = useState();
  var [pag5I, setPag5I] = useState();

  var [pag6C, setPag6C] = useState();
  var [pag6I, setPag6I] = useState();

  var [pag7C, setPag7C] = useState();
  var [pag7I, setPag7I] = useState();

  const classes = useStyles();

  function validateAnswers(){
    var total = 0;

    if(pag1C === undefined || pag1C.isNaN || pag1C === null || pag1C === ''){ setPag1C(0) } else{ total += parseInt(pag1C) }
    if(pag1I === undefined || pag1I.isNaN || pag1I === null || pag1I === ''){ setPag1I(0) } else{ total -= parseInt(pag1I) }

    if(pag2C === undefined || pag2C.isNaN || pag2C === null || pag2C === ''){ setPag2C(0) } else{ total += parseInt(pag2C) }
    if(pag2I === undefined || pag2I.isNaN || pag2I === null || pag2I === ''){ setPag2I(0) } else{ total -= parseInt(pag2I) }

    if(pag3C === undefined || pag3C.isNaN || pag3C === null || pag3C === ''){ setPag3C(0) } else{ total += parseInt(pag3C) }
    if(pag3I === undefined || pag3I.isNaN || pag3I === null || pag3I === ''){ setPag3I(0) } else{ total -= parseInt(pag3I) }

    if(pag4C === undefined || pag4C.isNaN || pag4C === null || pag4C === ''){ setPag4C(0) } else{ total += parseInt(pag4C) }
    if(pag4I === undefined || pag4I.isNaN || pag4I === null || pag4I === ''){ setPag4I(0) } else{ total -= parseInt(pag4I) }

    if(pag5C === undefined || pag5C.isNaN || pag5C === null || pag5C === ''){ setPag5C(0) } else{ total += parseInt(pag5C) }
    if(pag5I === undefined || pag5I.isNaN || pag5I === null || pag5I === ''){ setPag5I(0) } else{ total -= parseInt(pag5I) }

    if(pag6C === undefined || pag6C.isNaN || pag6C === null || pag6C === ''){ setPag6C(0) } else{ total += parseInt(pag6C) }
    if(pag6I === undefined || pag6I.isNaN || pag6I === null || pag6I === ''){ setPag6I(0) } else{ total -= parseInt(pag6I) }

    if(pag7C === undefined || pag7C.isNaN || pag7C === null || pag7C === ''){ setPag7C(0) } else{ total += parseInt(pag7C) }
    if(pag7I === undefined || pag7I.isNaN || pag7I === null || pag7I === ''){ setPag7I(0) } else{ total -= parseInt(pag7I) }
    
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

    if(!props.resWechsler.hasOwnProperty('BS')){
      props.setResWechsler('BS',result)
    }else{
      if(props.resWechsler['BS'] !== result){
        props.setResWechsler('BS',result)
      }
    }

    return result;
  }

  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Búsqueda de símbolos</h1>
            <b>Intrucciones generales:</b>
            <p>Seleccione la opción según sea el caso:</p>
            
            <CustomButton
              msj="Aplicación de subPrueba"
              callback={()=>setState("aplicacion")}
            ></CustomButton>
            <CustomButton
              msj="Registro de resultados"
              callback={()=>setState('registro')}
            ></CustomButton>
          </div>
        )

      case "aplicacion":
        return(
          <div>
            <h1>Búsqueda de símbolos: Guía de aplicación</h1>
            <p>Pacientes de edad 16-89 años o con sospechas de discapacidad intelectual: <b> Ítems de demostración, ítems de ejemplo, ítems del test </b></p>
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
              <h1>Búsqueda de Símbolos</h1>
              <b>Intrucciones:</b>
              <p>Registre las calificaciones obtenidas por el paciente en la subprueba</p>

              <div className={classes.fields}>
                <h3> Página 1 </h3>
                <div className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    label={"Correctas"}
                    type="number"
                    defaultValue={pag1C}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag1C(x.target.value)}
                  />
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label={"Incorrectas"}
                    type="number"
                    defaultValue={pag1I}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag1I(x.target.value)}
                  />
                  &nbsp;  &nbsp;                
                </div>
              </div>

              <div className={classes.fields}>
                <h3> Página 2 </h3>
                <div className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    label={"Correctas"}
                    type="number"
                    defaultValue={pag2C}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag2C(x.target.value)}
                  />
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label={"Incorrectas"}
                    type="number"
                    defaultValue={pag2I}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag2I(x.target.value)}
                  />
                  &nbsp;  &nbsp;                
                </div>
              </div>

              <div className={classes.fields}>
                <h3> Página 3 </h3>
                <div className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    label={"Correctas"}
                    type="number"
                    defaultValue={pag3C}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag3C(x.target.value)}
                  />
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label={"Incorrectas"}
                    type="number"
                    defaultValue={pag3I}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag3I(x.target.value)}
                  />
                  &nbsp;  &nbsp;                
                </div>
              </div>

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

              <div className={classes.fields}>
                <h3> Página 7 </h3>
                <div className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    label={"Correctas"}
                    type="number"
                    defaultValue={pag7C}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag7C(x.target.value)}
                  />
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label={"Incorrectas"}
                    type="number"
                    defaultValue={pag7I}
                    inputProps={{ min:0 }}
                    variant="outlined"
                    onChange={(x)=>setPag7I(x.target.value)}
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
        
      case "terminado":
        return(
          <Results
            name="Búsqueda de Símbolos"
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

const mapStateToProps = (state) => {
  
  return {
    resWechsler: state.wechslerReducer.resWechsler,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusquedaSimbolos);
