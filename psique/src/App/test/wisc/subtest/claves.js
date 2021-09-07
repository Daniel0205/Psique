import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
import TestsTimer from '../../../components/TestsTimer'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
//import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";
import { setBody } from "../../../store/body/action";

let clavesA = false;
const TESTDURATION = 120;

const useStyles = makeStyles((theme) => ({
  table: {
    alignSelf: "center",
    width: "fit-content",
  },
  buttons: {
    alignSelf: "center",
  },
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

function createData(timeRange, bonusP, totalNS) {
  return { timeRange, bonusP, totalNS };
}

const rows = [
  createData('116-120', 0, 59),
  createData('111-115', 1, 60),
  createData('106-110', 2, 61),
  createData('101-105', 3, 62),
  createData( '96-100', 4, 63),
  createData( '86-95' , 5, 64),
  createData(  '≤85'  , 6, 65),
];

function Claves(props) {
  var [state,setState] = useState("instruccion");
  var [result,setResult] = useState();
  var [isCheckResults, setIsCheckResults] = useState(false);
  const classes = useStyles();

  function testInit(clvs){
    setState('registro');
    if(clvs ==='A'){
      clavesA = true;
    }else{
      clavesA = false;
    }
  }

  function validateAnswers(){
    if(result === undefined || result.isNaN || result === null || result === ''){ setResult(0) }
  }

  function ShowResults(){
    validateAnswers();
    setState("terminado");
    setIsCheckResults(true);
  }

  function getResult() {

    if(!props.resWechsler.hasOwnProperty('CL')){
      props.setResWechsler('CL',result)
    }else{
      if(props.resWechsler['CL'] !== result){
        props.setResWechsler('CL',result)
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
            <p>Seleccione la opción según sea el caso</p>
            
            <CustomButton
              msj="Aplicación de subPrueba"
              callback={()=>setState("aplicacion")}
            ></CustomButton>
            <CustomButton
              msj="Registro de resultados"
              callback={()=>setState("seleccion")}
            ></CustomButton>
            <br/>
            <Tooltip title="Regresar al menu de wisc">
              <Button className={classes.buttonStyle} onClick={()=>props.setBody("WISC-selection")}>
                <ArrowBackIcon />
              </Button>
            </Tooltip> 
          </div>
        )

      case "aplicacion":
        return(
          <div>
            <h1>Clave de números: Guia de aplicación</h1>
            <p>Según la edad o condición del paciente se le entrega la hoja de aplicación indicada a continuación </p>
            <p> </p>
            <p>Pacientes de edad 6-7 años o con sospechas de discapacidad intelectual: <b>Claves A </b></p>
            <p>Pacientes de edad 8-16: <b>Claves B </b></p>
            <p>El temporizador sirve de ayuda para tomar el tiempo, inicie el tiempo una vez dadas las instrucciones de la prueba</p>
            <p>Recuerde al finalizar la prueba guardar el registro de cuanto fue el tiempo usado por el paciente (tiempo total = {TESTDURATION} segundos)</p>
            <p><b>La interfaz sirve de ayuda durante la prueba, la cual debe aplicarse de forma manual con el material de apoyo correspondiente</b></p>
            <br/>
            <TestsTimer duration={TESTDURATION}></TestsTimer>
            <br/>

            <WaisWiscReturnButton
              msj="Regresar a la subPrueba"
              callback={()=>setState("instruccion")}
            ></WaisWiscReturnButton>
          </div>
        )

        case "seleccion":
        return(
          <div>
            <h1>Clave de números</h1>
            <p>Seleccione el reactivo que se le aplicó al paciente </p>
            <p>Pacientes de edad 6-7 años o con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Clave de Números A"
              callback={()=>testInit('A')}
            ></CustomButton>            
            <br/>
            <p>Pacientes de edad 8-16:</p>
            <CustomButton
              msj="Clave de Números B"
              callback={()=>testInit('B')}
            ></CustomButton>
            <br/>
            <WaisWiscReturnButton
              msj="Regresar a la subPrueba"
              callback={()=>setState("instruccion")}
            ></WaisWiscReturnButton>
          </div>
        )

        case "registro":
          if(clavesA){
            return(
              <div>
                <h1>Clave de números A</h1>

                <Grid container justify="center">
                  <TableContainer component={Paper} className={classes.table}>
                    <Table  size="small" aria-label="Claves A Table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Rango del tiempo de terminación (en segundos)</TableCell>
                          <TableCell align="center">Puntos de bonificación</TableCell>
                          <TableCell align="center">Puntuación natural total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.timeRange}>
                            <TableCell align="center">{row.timeRange}</TableCell>
                            <TableCell align="center">{row.bonusP}</TableCell>
                            <TableCell align="center">{row.totalNS}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <br/>
                <p><b>Instrucciones:</b> Registre la calificación obtenida por el paciente en la prueba</p>

                <TextField
                  className={classes.textfield}
                  label = "Puntuación del paciente"
                  id="filled-number"
                  defaultValue={result}
                  type="number"
                  inputProps={{min:0, max:65}}
                  variant="outlined"
                  onChange={(x)=>{setResult(x.target.value)}}
                /> 
                <br/> 
                <br />
                <Grid container justify="center" spacing={2}>
                  {isCheckResults ? <div/> :
                    <WaisWiscReturnButton
                      msj="Regresar a selección"
                      callback={()=>setState("seleccion")}
                    ></WaisWiscReturnButton>
                  }
                  <CustomButton
                    msj="Terminar"
                    callback={()=>ShowResults()}
                  ></CustomButton>
                </Grid>
              </div>
              )
          }else{
            return(
              <div>
                <h1>Clave de números B</h1>
                <p><b>Instrucciones:</b> Registre la calificación obtenida por el paciente en la prueba</p>    

                <TextField
                  className={classes.textfield}
                  id="filled-number"
                  label = "Puntuación del paciente"
                  defaultValue={result}
                  type="number"                    
                  inputProps={{min:0, max:119}}
                  variant="outlined"
                  onChange={(x)=>{setResult(x.target.value)}}
                /> 
                <br/> 
                <br />
                <Grid container justify="center" spacing={2}>
                  {isCheckResults ? <div/> :
                    <WaisWiscReturnButton
                      msj="Regresar a selección"
                      callback={()=>setState("seleccion")}
                    ></WaisWiscReturnButton>
                  }
                  <CustomButton
                    msj="Terminar"
                    callback={()=>ShowResults()}
                  ></CustomButton>
                </Grid>
              </div>
            )
          }
        
      case "terminado":
        return(
          <Results
            name="Claves de Numeros"
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

export default connect(mapStateToProps, mapDispatchToProps)(Claves);
