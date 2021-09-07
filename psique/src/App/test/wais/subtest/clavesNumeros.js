import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import TestsTimer from '../../../components/TestsTimer'
import { makeStyles } from '@material-ui/core/styles';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { setBody } from "../../../store/body/action";

const useStyles = makeStyles((theme) => ({
  textfield:{
    width:"20%"
  },
  buttonStyle: {
    minWidth: "45px",
    margin: theme.spacing(1), 
    backgroundColor: "#017F8D",
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    textTransform: "none",
  },
}));

const TESTDURATION = 120;

function ClavesNumeros(props) {
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

    if(!props.resWechsler.hasOwnProperty('CN')){
      props.setResWechsler('CN',result)
    }else{
      if(props.resWechsler['CN'] !== result){
        props.setResWechsler('CN',result)
      }
    }

    return result;
  }

  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Clave de números</h1>
            <b>Instrucciones generales:</b>
            <p>Seleccione la opción según sea el caso:</p>
            
            <CustomButton
              msj="Aplicación de subPrueba"
              callback={()=>setState("aplicacion")}
            ></CustomButton>
            <CustomButton
              msj="Registro de resultados"
              callback={()=>setState("registro")}
            ></CustomButton>
            <br/>
            <Tooltip title="Regresar al menu de wais">
              <Button className={classes.buttonStyle} onClick={()=>props.setBody("WAIS-selection")}>
                <ArrowBackIcon />
              </Button>
            </Tooltip>
          </div>
        )

      case "aplicacion":
        return(
          <div>
            <h1>Clave de números: Guía de aplicación</h1>
            <p> <b>Edad 16-89:</b> Aplicar items de demostración, items de ejemplo e items del test </p>
            <p>El temporizador sirve de ayuda para tomar el tiempo, inicie el tiempo una vez dadas las instrucciones de la prueba</p>
            <p>Recuerde al finalizar la prueba guardar el registro de cuanto fue el tiempo usado por el paciente (tiempo total = {TESTDURATION} segundos)</p>

            <br/>
            <TestsTimer duration={TESTDURATION}></TestsTimer>
            <br/>

            <WaisWiscReturnButton
              msj="Regresar a la subPrueba"
              callback={()=>setState("instruccion")}
            ></WaisWiscReturnButton>
          </div>
        )

        case "registro":          
          return(
            <div>
              <h1>Clave de números</h1>
              <p><b>Instrucciones:</b> Registre la calificación obtenida por el paciente en la prueba</p>    

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
              <Grid container justify="center">
                <WaisWiscReturnButton
                  msj="Retroceder"
                  callback={()=>setState("instruccion")}
                ></WaisWiscReturnButton>
                <CustomButton
                  msj="Terminar"
                  callback={()=>ShowResults()}
                ></CustomButton>
              </Grid>
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

const mapStateToProps = (state) => {
  
  return {
    resWechsler: state.wechslerReducer.resWechsler,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setBody: (item) => dispatch(setBody(item)),
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClavesNumeros);
