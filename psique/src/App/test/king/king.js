import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../../components/customButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {Link} from "react-router-dom";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import moment from "moment";

import reyImage from '../../assets/ReyTest/ReyImage.png';

const useStyles =  makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "70%",
    width: '60%',
  },
  classTitle: {
    textAlign: "center",
    alignSelf: "center",
  },
  ReyImage: {
    backgroundImage: "url(" + reyImage + ")",
    backgroundSize: "cover",
    maxInlineSize: "-webkit-fill-available",
  },
  snackbarStyle: {
    color: "white",
    alignSelf: "center",
    backgroundColor: '#F55448',
    width: '50%',
  },
  aling_Contents: {
    alingContents: 'center',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    alignSelf: "center",
    verticalAlign: "center",
  },
  figureName: {
    alignSelf: "center",
  },
  testEvaluationContainer: {    
    height: 450,
    width: "auto",
    overflowY: "auto",
    overflowX: "hidden",
  },
  fontcopytype: {
    fontWeight: "bold",
  }
}));

//let stateR = "copy";
let maxMinutes = 60; 

function King() {
  const classes = useStyles();  

  var patientName = "Juan Pablo Prueba";
  var patientId = "0";
  var [stateR,setStateR]=useState("copy") //copy, evocation
  var [modalControl,setModalControl] = useState(false);

  const [testDate, setTestDate] = React.useState(moment(new Date()).format("YYYY-MM-DD"));
  var [minutes, setMinutes] = useState(0);
  var [seconds, setSeconds] = useState(0);
  var [copyType, setCopyType] = useState("");
  var [observ, setObserv] = useState("");  

  var [absentFig1, setabsentFig1] = useState(false);
  var [stateFig1, setstateFig1] = useState('correcta');
  var [locatedFig1, setlocatedFig1] = useState(false);

  var [absentFig2, setabsentFig2] = useState(false);
  var [stateFig2, setstateFig2] = useState('correcta');
  var [locatedFig2, setlocatedFig2] = useState(false);

  var [absentFig3, setabsentFig3] = useState(false);
  var [stateFig3, setstateFig3] = useState('correcta');
  var [locatedFig3, setlocatedFig3] = useState(false);

  var [absentFig4, setabsentFig4] = useState(false);
  var [stateFig4, setstateFig4] = useState('correcta');
  var [locatedFig4, setlocatedFig4] = useState(false);

  var [absentFig5, setabsentFig5] = useState(false);
  var [stateFig5, setstateFig5] = useState('correcta');
  var [locatedFig5, setlocatedFig5] = useState(false);

  var [absentFig6, setabsentFig6] = useState(false);
  var [stateFig6, setstateFig6] = useState('correcta');
  var [locatedFig6, setlocatedFig6] = useState(false);

  var [absentFig7, setabsentFig7] = useState(false);
  var [stateFig7, setstateFig7] = useState('correcta');
  var [locatedFig7, setlocatedFig7] = useState(false);

  var [absentFig8, setabsentFig8] = useState(false);
  var [stateFig8, setstateFig8] = useState('correcta');
  var [locatedFig8, setlocatedFig8] = useState(false);

  var [absentFig9, setabsentFig9] = useState(false);
  var [stateFig9, setstateFig9] = useState('correcta');
  var [locatedFig9, setlocatedFig9] = useState(false);

  var [absentFig10, setabsentFig10] = useState(false);
  var [stateFig10, setstateFig10] = useState('correcta');
  var [locatedFig10, setlocatedFig10] = useState(false);

  var [absentFig11, setabsentFig11] = useState(false);
  var [stateFig11, setstateFig11] = useState('correcta');
  var [locatedFig11, setlocatedFig11] = useState(false);

  var [absentFig12, setabsentFig12] = useState(false);
  var [stateFig12, setstateFig12] = useState('correcta');
  var [locatedFig12, setlocatedFig12] = useState(false);

  var [absentFig13, setabsentFig13] = useState(false);
  var [stateFig13, setstateFig13] = useState('correcta');
  var [locatedFig13, setlocatedFig13] = useState(false);

  var [absentFig14, setabsentFig14] = useState(false);
  var [stateFig14, setstateFig14] = useState('correcta');
  var [locatedFig14, setlocatedFig14] = useState(false);

  var [absentFig15, setabsentFig15] = useState(false);
  var [stateFig15, setstateFig15] = useState('correcta');
  var [locatedFig15, setlocatedFig15] = useState(false);

  var [absentFig16, setabsentFig16] = useState(false);
  var [stateFig16, setstateFig16] = useState('correcta');
  var [locatedFig16, setlocatedFig16] = useState(false);

  var [absentFig17, setabsentFig17] = useState(false);
  var [stateFig17, setstateFig17] = useState('correcta');
  var [locatedFig17, setlocatedFig17] = useState(false);

  var [absentFig18, setabsentFig18] = useState(false);
  var [stateFig18, setstateFig18] = useState('correcta');
  var [locatedFig18, setlocatedFig18] = useState(false);

  var [score, setScore] = useState(0);
  var [time, setTime] = useState(0);


  var [minutesEvocation, setMinutesEvocation] = useState(0);
  var [secondsEvocation, setSecondsEvocation] = useState(0);
  var [copyTypeEvocation, setCopyTypeEvocation] = useState("");
  var [observEvocation, setObservEvocation] = useState(""); 

  var [absentEvocationFig1, setabsentEvocationFig1] = useState(false);
  var [stateEvocationFig1, setstateEvocationFig1] = useState('correcta');
  var [locatedEvocationFig1, setlocatedEvocationFig1] = useState(false);

  var [absentEvocationFig2, setabsentEvocationFig2] = useState(false);
  var [stateEvocationFig2, setstateEvocationFig2] = useState('correcta');
  var [locatedEvocationFig2, setlocatedEvocationFig2] = useState(false);

  var [absentEvocationFig3, setabsentEvocationFig3] = useState(false);
  var [stateEvocationFig3, setstateEvocationFig3] = useState('correcta');
  var [locatedEvocationFig3, setlocatedEvocationFig3] = useState(false);

  var [absentEvocationFig4, setabsentEvocationFig4] = useState(false);
  var [stateEvocationFig4, setstateEvocationFig4] = useState('correcta');
  var [locatedEvocationFig4, setlocatedEvocationFig4] = useState(false);

  var [absentEvocationFig5, setabsentEvocationFig5] = useState(false);
  var [stateEvocationFig5, setstateEvocationFig5] = useState('correcta');
  var [locatedEvocationFig5, setlocatedEvocationFig5] = useState(false);

  var [absentEvocationFig6, setabsentEvocationFig6] = useState(false);
  var [stateEvocationFig6, setstateEvocationFig6] = useState('correcta');
  var [locatedEvocationFig6, setlocatedEvocationFig6] = useState(false);

  var [absentEvocationFig7, setabsentEvocationFig7] = useState(false);
  var [stateEvocationFig7, setstateEvocationFig7] = useState('correcta');
  var [locatedEvocationFig7, setlocatedEvocationFig7] = useState(false);

  var [absentEvocationFig8, setabsentEvocationFig8] = useState(false);
  var [stateEvocationFig8, setstateEvocationFig8] = useState('correcta');
  var [locatedEvocationFig8, setlocatedEvocationFig8] = useState(false);

  var [absentEvocationFig9, setabsentEvocationFig9] = useState(false);
  var [stateEvocationFig9, setstateEvocationFig9] = useState('correcta');
  var [locatedEvocationFig9, setlocatedEvocationFig9] = useState(false);

  var [absentEvocationFig10, setabsentEvocationFig10] = useState(false);
  var [stateEvocationFig10, setstateEvocationFig10] = useState('correcta');
  var [locatedEvocationFig10, setlocatedEvocationFig10] = useState(false);

  var [absentEvocationFig11, setabsentEvocationFig11] = useState(false);
  var [stateEvocationFig11, setstateEvocationFig11] = useState('correcta');
  var [locatedEvocationFig11, setlocatedEvocationFig11] = useState(false);

  var [absentEvocationFig12, setabsentEvocationFig12] = useState(false);
  var [stateEvocationFig12, setstateEvocationFig12] = useState('correcta');
  var [locatedEvocationFig12, setlocatedEvocationFig12] = useState(false);

  var [absentEvocationFig13, setabsentEvocationFig13] = useState(false);
  var [stateEvocationFig13, setstateEvocationFig13] = useState('correcta');
  var [locatedEvocationFig13, setlocatedEvocationFig13] = useState(false);

  var [absentEvocationFig14, setabsentEvocationFig14] = useState(false);
  var [stateEvocationFig14, setstateEvocationFig14] = useState('correcta');
  var [locatedEvocationFig14, setlocatedEvocationFig14] = useState(false);

  var [absentEvocationFig15, setabsentEvocationFig15] = useState(false);
  var [stateEvocationFig15, setstateEvocationFig15] = useState('correcta');
  var [locatedEvocationFig15, setlocatedEvocationFig15] = useState(false);

  var [absentEvocationFig16, setabsentEvocationFig16] = useState(false);
  var [stateEvocationFig16, setstateEvocationFig16] = useState('correcta');
  var [locatedEvocationFig16, setlocatedEvocationFig16] = useState(false);

  var [absentEvocationFig17, setabsentEvocationFig17] = useState(false);
  var [stateEvocationFig17, setstateEvocationFig17] = useState('correcta');
  var [locatedEvocationFig17, setlocatedEvocationFig17] = useState(false);

  var [absentEvocationFig18, setabsentEvocationFig18] = useState(false);
  var [stateEvocationFig18, setstateEvocationFig18] = useState('correcta');
  var [locatedEvocationFig18, setlocatedEvocationFig18] = useState(false);
  
  var [scoreEvocation, setScoreEvocation] = useState(0);
  var [timeEvocation, setTimeEvocation] = useState(0);


  //var maxMinutes = 60; 
  //var [modalControl, setModalControl] = useState(false);

  const [alertController, setAlertController] = useState(0); //0: nothing; 1: alertTime; 2: alertMinutes; 3: alertSeconds

  function computeScores(absentV, stateV, locatedV){
    /* 
      Correcta: (=2)
        bien situada: 2 Puntos (-1)
        mal situada: 1 Puntos (*0.5)
      Incorrecta: (=1)
        bien situada: 1 Puntos (*1)
        mal situada: 0.5 Puntos (*0.5)
      Ausente: 0 Puntos (*0)
    
      Valor = State[2 ó 1] * Located[1 ó 0.5] * absent[1 ó 0]
    */
    var state, located, absent, result;
    if(stateV === "correcta"){ state = 2; }else{ state = 1; }    
    if(locatedV){ located = 1; }else{ located = 0.5; }
    if(absentV){ absent = 0; }else{ absent = 1; }
    result = state * located * absent;

    return result;
  }

  /*const save = () => {
    setAlertController(0);    
    if((minutes >= 0) || (minutes <= maxMinutes)){
      if((seconds >= 0) || (seconds < 60)){
        let timeSum = Number(minutes*60) + Number(seconds);
        setTime(timeSum);

        if(timeSum > 0){
          setScore(computeScores(absentFig1,  stateFig1,  locatedFig1) +
                   computeScores(absentFig2,  stateFig2,  locatedFig2) +
                   computeScores(absentFig3,  stateFig3,  locatedFig3) +
                   computeScores(absentFig4,  stateFig4,  locatedFig4) +
                   computeScores(absentFig5,  stateFig5,  locatedFig5) +
                   computeScores(absentFig6,  stateFig6,  locatedFig6) +
                   computeScores(absentFig7,  stateFig7,  locatedFig7) +
                   computeScores(absentFig8,  stateFig8,  locatedFig8) +
                   computeScores(absentFig9,  stateFig9,  locatedFig9) +
                   computeScores(absentFig10, stateFig10, locatedFig10) +
                   computeScores(absentFig11, stateFig11, locatedFig11) +
                   computeScores(absentFig12, stateFig12, locatedFig12) +
                   computeScores(absentFig13, stateFig13, locatedFig13) +
                   computeScores(absentFig14, stateFig14, locatedFig14) +
                   computeScores(absentFig15, stateFig15, locatedFig15) +
                   computeScores(absentFig16, stateFig16, locatedFig16) +
                   computeScores(absentFig17, stateFig17, locatedFig17) +
                   computeScores(absentFig18, stateFig18, locatedFig18));
          //alert("Time: " + time + " Segundos - Score: " + score);
          setModalControl(true)
        }else{
          // MENSAJE DE TIEMPO INVÁLIDO
          //alert('Tiempo Inválido: ' + time);
          setAlertController(1);          
        }
      }else{
        // MENSAJE DE SEGUNDOS INVÁLIDOS
        //alert('Segundos Inválidos: ' + seconds);
        setAlertController(2);
      }
    }else{
      // MENSAJE DE MINUTOS INVÁLIDOS
      //alert('Minutos inválidos: ' + minutes);
      setAlertController(3);
    }
  }*/

  function customAlert(message){
    return(
      <Grid container  className={classes.snackbarStyle} justify="center" spacing={1}>        
        <ErrorIcon/>
        {message}
      </Grid>
    )
  }

  function alertsSave(){
    switch(alertController){
      case 1:      
        return customAlert('Tiempo Inválido');

      case 2:
        return customAlert('Segundos Inválidos');      

      case 3:
        return customAlert('Minutos Inválidos');

      default:
        return;
    }
  }

  function next(){
    switch(stateR){
      case "copy":
        setAlertController(0);
        if((minutes >= 0) || (minutes <= maxMinutes)){
          if((seconds >= 0) || (seconds < 60)){
            let timeSum = Number(minutes*60) + Number(seconds);
            setTime(timeSum);

            if(timeSum > 0){
              setScore(
                computeScores(absentFig1,  stateFig1,  locatedFig1) +
                computeScores(absentFig2,  stateFig2,  locatedFig2) +
                computeScores(absentFig3,  stateFig3,  locatedFig3) +
                computeScores(absentFig4,  stateFig4,  locatedFig4) +
                computeScores(absentFig5,  stateFig5,  locatedFig5) +
                computeScores(absentFig6,  stateFig6,  locatedFig6) +
                computeScores(absentFig7,  stateFig7,  locatedFig7) +
                computeScores(absentFig8,  stateFig8,  locatedFig8) +
                computeScores(absentFig9,  stateFig9,  locatedFig9) +
                computeScores(absentFig10, stateFig10, locatedFig10) +
                computeScores(absentFig11, stateFig11, locatedFig11) +
                computeScores(absentFig12, stateFig12, locatedFig12) +
                computeScores(absentFig13, stateFig13, locatedFig13) +
                computeScores(absentFig14, stateFig14, locatedFig14) +
                computeScores(absentFig15, stateFig15, locatedFig15) +
                computeScores(absentFig16, stateFig16, locatedFig16) +
                computeScores(absentFig17, stateFig17, locatedFig17) +
                computeScores(absentFig18, stateFig18, locatedFig18));
              //stateR = "evocation";
              setStateR("evocation");
              //alert(stateR);
            }else{
              setAlertController(1); // MENSAJE DE TIEMPO INVÁLIDO              
            }
          }else{
            setAlertController(2); // MENSAJE DE SEGUNDOS INVÁLIDOS
          }
        }else{
          setAlertController(3); // MENSAJE DE MINUTOS INVÁLIDOS          
        }
      break;
      case "evocation":
        setAlertController(0);
        if((minutesEvocation >= 0) || (minutesEvocation <= maxMinutes)){
          if((secondsEvocation >= 0) || (secondsEvocation < 60)){
            let timeSum = Number(minutesEvocation*60) + Number(secondsEvocation);
            setTimeEvocation(timeSum);

            if(timeSum > 0){
              setScoreEvocation(
                computeScores(absentEvocationFig1,  stateEvocationFig1,  locatedEvocationFig1) +
                computeScores(absentEvocationFig2,  stateEvocationFig2,  locatedEvocationFig2) +
                computeScores(absentEvocationFig3,  stateEvocationFig3,  locatedEvocationFig3) +
                computeScores(absentEvocationFig4,  stateEvocationFig4,  locatedEvocationFig4) +
                computeScores(absentEvocationFig5,  stateEvocationFig5,  locatedEvocationFig5) +
                computeScores(absentEvocationFig6,  stateEvocationFig6,  locatedEvocationFig6) +
                computeScores(absentEvocationFig7,  stateEvocationFig7,  locatedEvocationFig7) +
                computeScores(absentEvocationFig8,  stateEvocationFig8,  locatedEvocationFig8) +
                computeScores(absentEvocationFig9,  stateEvocationFig9,  locatedEvocationFig9) +
                computeScores(absentEvocationFig10, stateEvocationFig10, locatedEvocationFig10) +
                computeScores(absentEvocationFig11, stateEvocationFig11, locatedEvocationFig11) +
                computeScores(absentEvocationFig12, stateEvocationFig12, locatedEvocationFig12) +
                computeScores(absentEvocationFig13, stateEvocationFig13, locatedEvocationFig13) +
                computeScores(absentEvocationFig14, stateEvocationFig14, locatedEvocationFig14) +
                computeScores(absentEvocationFig15, stateEvocationFig15, locatedEvocationFig15) +
                computeScores(absentEvocationFig16, stateEvocationFig16, locatedEvocationFig16) +
                computeScores(absentEvocationFig17, stateEvocationFig17, locatedEvocationFig17) +
                computeScores(absentEvocationFig18, stateEvocationFig18, locatedEvocationFig18));
              //stateR = "results";
              setStateR("results");
            }else{
              setAlertController(1); // MENSAJE DE TIEMPO INVÁLIDO              
            }
          }else{
            setAlertController(2); // MENSAJE DE SEGUNDOS INVÁLIDOS
          }
        }else{
          setAlertController(3); // MENSAJE DE MINUTOS INVÁLIDOS          
        }
      break;
      default:
      break;
    }
  }

  function previous(){
    switch(stateR){
      case "evocation":
        //alert(stateR);
        //stateR = "copy";
        setStateR("copy");
        //alert(stateR);
      break;
      case "results":       
        //stateR = "evocation";
        setStateR("evocation");
      break;
      default:
      break;
    }
  }

  function showCopyType(){
    return(
      <div>
        <Dialog aria-labelledby="simple-dialog-title" open={modalControl}>
          <DialogTitle id="simple-dialog-title">Tipos de copia</DialogTitle>
          <Divider />
            <DialogContent>              
              <DialogContentText id="type1"><Typography variant="h6" className={classes.fontcopytype}>I. Construcción sobre el armazón</Typography> (Predominante en adultos; desde los 8 años empieza aparecer. Después de los 15 años es predominante) </DialogContentText>
              <DialogContentText id="type1D">El sujeto comienza su dibujo por el rectángulo central, sobre el cual agrupa después todos los demás detalles de la figura. El gran rectángulo (y sus diagonales) sirven de referencia y punto de partida.</DialogContentText>
              <br></br>
              <DialogContentText id="type2"><Typography variant="h6" className={classes.fontcopytype}>II. Detalles englobados en un armazón</Typography> (No es predominante en ninguna edad; sin embargo, es más común en adultos)</DialogContentText>
              <DialogContentText id="type2D">El sujeto comienza por uno u otro detalle contiguo al gran rectángulo (por ejemplo,cruz superior izquierda), o traza el rectángulo y luego algún detalle lateral (por ejemplo, cuadrado inferior). También es tipo II cuando sujeto dibuja primero diagonales, para luego envolver en rectángulo centra (muy poco común).</DialogContentText>
              <br></br>
              <DialogContentText id="type3"><Typography variant="h6" className={classes.fontcopytype}>III. Contorno general</Typography> (Predomina en los 12 a 13 años; a los 14 años empieza a desaparecer. Es raro en adultos)</DialogContentText>
              <DialogContentText id="type3D">El sujeto comienza por dibujar el contorno íntegro de la figura, sin diferenciar elrectángulo central. Sujeto obtiene así una especia de contenedor en el que luego coloca todos los detalles internos de la figura.</DialogContentText>
              <br></br>
              <DialogContentText id="type4"><Typography variant="h6" className={classes.fontcopytype}>IV. Yuxtaposición de detalles</Typography> (Se observa de 5 a 11 años. Se aprecia en los 8 años)</DialogContentText>
              <DialogContentText id="type4D">El sujeto va construyendo los detalles contiguos unos a otros procediendo como si constituyera un rompecabezas. No hay elemento director de la reproducción. La figura final, con este método, puede ser perfecta.</DialogContentText>
              <br></br>
              <DialogContentText id="type5"><Typography variant="h6" className={classes.fontcopytype}>V. Detalles sobre un fondo confuso</Typography> (Común en niños de 5 a 7 años; hacia los 8 años, desaparece este tipo de copia)</DialogContentText>
              <DialogContentText id="type5D">El sujeto realiza un grafismo poco o nada estructurado, en el que no posible identificar el modelo, sino que sólo unos detalles.</DialogContentText>
              <br></br>
              <DialogContentText id="type6"><Typography variant="h6" className={classes.fontcopytype}>VI. Reducción a un esquema familiar</Typography> (Niños menores de 5 años; alrededor de los 6 años, ya no se observan estos tipos de copia)</DialogContentText>
              <DialogContentText id="type6D">El sujeto traslada la figura a un esquema que le es familiar y que recuerda (a veces vagamente), la forma del modelo (casa, barco, pez, monigote, etc.).</DialogContentText>
              <br></br>
              <DialogContentText id="type7"><Typography variant="h6" className={classes.fontcopytype}>VII. Garabatos</Typography> (Niños menores de 5 años; alrededor de los 6 años, ya no se observan estos tipos de copia)</DialogContentText>
              <DialogContentText id="type7D">Sujeto simplemente hace unos garabatos en los que no es posible reconocer ningunode los elementos del modelo ni tampoco su forma global.</DialogContentText>
              <br></br>
            </DialogContent>
            <DialogActions>
              <Grid container justify="center">              
                <Grid item> <CustomButton msj="Cerrar" callback={()=>setModalControl(false)} /> </Grid>
              </Grid>
            </DialogActions>
        </Dialog>    
      </div>
    );
  }

  function content(){
    switch(stateR){
      case "copy":
        return(
          <div>
            <br></br>            
            <Container justify="center" align="center" fixed>
            <Paper className={classes.paper}>
              {showCopyType()}
              <br></br>
              <Typography  variant="h4">Prueba del Rey</Typography>
              <Typography  variant="body1" component="h5">Registro de resultados de copia</Typography>
              <Divider />
              <br></br>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <Typography  variant="body1" component="h6">Paciente: {patientName}</Typography>
                </Grid>
                <Grid item>
                  <Typography  variant="body1" component="h6">ID: {patientId}</Typography>                   
                </Grid>
              </Grid>

              <br></br>
              <form align="center">
                <Grid container justify="center" spacing={2}>            
                  <TextField
                    id="date"
                    label="Fecha de la Prueba"
                    type="date"
                    value={testDate}
                    onChange={(e)=>setTestDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <br></br>
                <Grid container justify="center" spacing={2}>
                  <Grid item className={classes.classTitle}> <FormLabel> Tiempo: </FormLabel> </Grid>
                  <Grid item> <TextField type="number" label="Minutos" value={minutes} onChange={(e)=>setMinutes(e.target.value)} maxLength="3" inputProps={{ 'aria-label': 'minutes', min:0, max:59 }} /> </Grid>
                  <Grid item> <TextField type="number" label="Segundos" value={seconds}  onChange={(e)=>setSeconds(e.target.value)} maxLength="2" inputProps={{ 'aria-label': 'seconds', min:0, max:59 }} /> </Grid>
                </Grid>
                <br></br>

                <Grid container justify="center">
                  <TextField  id="copyType" multiline label="Tipo de Copia" onChange={(e)=>setCopyType(e.target.value)} value={copyType} inputProps={{ 'aria-label': 'copy-type' }}/>
                  <IconButton onClick={()=>setModalControl(true)}> <HelpOutlineIcon></HelpOutlineIcon> </IconButton>
                </Grid>
                <br></br><br></br>
                <Grid container justify="center">
                  <Tooltip title="Observaciones adicionales por parte del neuropsicologo"><TextField  id="observ" multiline label="Observaciones" onChange={(e)=>setObserv(e.target.value)} value={observ} inputProps={{ 'aria-label': 'observations' }}/></Tooltip>
                </Grid>

                <br></br><br></br>
                <Divider  variant="middle"/>
                <Grid container justify="center">
                  <h3 align="center">Calificación de la prueba</h3>
                </Grid>
                <Grid container justify="center">
                  <img className={classes.ReyImage} src={reyImage} alt="Rey-test"/> 
                </Grid>

                <br></br><br></br>
                              
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={3} className={classes.figureName}> <FormLabel>Número </FormLabel> </Grid>
                  <Grid item xs={1} className={classes.figureName}> <FormLabel>Ausente </FormLabel> </Grid>
                  <Grid item xs={3} className={classes.figureName}> <FormLabel>Estado de la fig. </FormLabel> </Grid>
                  <Grid item xs={1} className={classes.figureName}> <FormLabel>Bien situada </FormLabel> </Grid>
                </Grid>

                <Grid container justify="center" spacing={2} className={classes.testEvaluationContainer}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>1. Cruz</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig1(!absentFig1)} checked={absentFig1} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig1} onChange={(e)=>setstateFig1(e.target.value)} disabled={absentFig1}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig1(!locatedFig1)} checked={locatedFig1} disabled={absentFig1} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>2. Rect. Grande</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig2(!absentFig2)} checked={absentFig2} inputProps={{ 'aria-label': 'absent-Fig2' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig2} onChange={(e)=>setstateFig2(e.target.value)} disabled={absentFig2}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig2(!locatedFig2)} checked={locatedFig2} disabled={absentFig2} inputProps={{ 'aria-label': 'located-Fig2' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>3. Diagonales del rect.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig3(!absentFig3)} checked={absentFig3} inputProps={{ 'aria-label': 'absent-Fig3' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig3} onChange={(e)=>setstateFig3(e.target.value)} disabled={absentFig3}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig3(!locatedFig3)} checked={locatedFig3} disabled={absentFig3} inputProps={{ 'aria-label': 'located-Fig3' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>4. Línea horz.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig4(!absentFig4)} checked={absentFig4} inputProps={{ 'aria-label': 'absent-Fig4' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig4} onChange={(e)=>setstateFig4(e.target.value)} disabled={absentFig4}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig4(!locatedFig4)} checked={locatedFig4} disabled={absentFig4} inputProps={{ 'aria-label': 'located-Fig4' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>5. Línea vert.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig5(!absentFig5)} checked={absentFig5} inputProps={{ 'aria-label': 'absent-Fig5' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig5} onChange={(e)=>setstateFig5(e.target.value)} disabled={absentFig5}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig5(!locatedFig5)} checked={locatedFig5} disabled={absentFig5} inputProps={{ 'aria-label': 'located-Fig5' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>6. Rect. con diagonales</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig6(!absentFig6)} checked={absentFig6} inputProps={{ 'aria-label': 'absent-Fig6' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig6} onChange={(e)=>setstateFig6(e.target.value)} disabled={absentFig6}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig6(!locatedFig6)} checked={locatedFig6} disabled={absentFig6} inputProps={{ 'aria-label': 'located-Fig6' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>7. Segmento peq.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig7(!absentFig7)} checked={absentFig7} inputProps={{ 'aria-label': 'absent-Fig7' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig7} onChange={(e)=>setstateFig7(e.target.value)} disabled={absentFig7}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig7(!locatedFig7)} checked={locatedFig7} disabled={absentFig7} inputProps={{ 'aria-label': 'located-Fig7' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>8.  líneas paralelas</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig8(!absentFig8)} checked={absentFig8} inputProps={{ 'aria-label': 'absent-Fig8' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig8} onChange={(e)=>setstateFig8(e.target.value)} disabled={absentFig8}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig8(!locatedFig8)} checked={locatedFig8} disabled={absentFig8} inputProps={{ 'aria-label': 'located-Fig8' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>9. Triangulo rect.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig9(!absentFig9)} checked={absentFig9} inputProps={{ 'aria-label': 'absent-Fig9' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig9} onChange={(e)=>setstateFig9(e.target.value)} disabled={absentFig9}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig9(!locatedFig9)} checked={locatedFig9} disabled={absentFig9} inputProps={{ 'aria-label': 'located-Fig9' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>10. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig10(!absentFig10)} checked={absentFig10} inputProps={{ 'aria-label': 'absent-Fig10' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig10} onChange={(e)=>setstateFig10(e.target.value)} disabled={absentFig10}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig10(!locatedFig10)} checked={locatedFig10} disabled={absentFig10} inputProps={{ 'aria-label': 'located-Fig10' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>11. Circulo con 3 puntos</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig11(!absentFig11)} checked={absentFig11} inputProps={{ 'aria-label': 'absent-Fig11' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig11} onChange={(e)=>setstateFig11(e.target.value)} disabled={absentFig11}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig11(!locatedFig11)} checked={locatedFig11} disabled={absentFig11} inputProps={{ 'aria-label': 'located-Fig11' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>12. 5 líneas paralelas</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig12(!absentFig12)} checked={absentFig12} inputProps={{ 'aria-label': 'absent-Fig12' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig12} onChange={(e)=>setstateFig12(e.target.value)} disabled={absentFig12}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig12(!locatedFig12)} checked={locatedFig12} disabled={absentFig12} inputProps={{ 'aria-label': 'located-Fig12' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>13. Triángulo isósceles</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig13(!absentFig13)} checked={absentFig13} inputProps={{ 'aria-label': 'absent-Fig13' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig13} onChange={(e)=>setstateFig13(e.target.value)} disabled={absentFig13}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig13(!locatedFig13)} checked={locatedFig13} disabled={absentFig13} inputProps={{ 'aria-label': 'located-Fig13' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>14. Rombo</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig14(!absentFig14)} checked={absentFig14} inputProps={{ 'aria-label': 'absent-Fig14' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig14} onChange={(e)=>setstateFig14(e.target.value)} disabled={absentFig14}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig14(!locatedFig14)} checked={locatedFig14} disabled={absentFig14} inputProps={{ 'aria-label': 'located-Fig14' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>15. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig15(!absentFig15)} checked={absentFig15} inputProps={{ 'aria-label': 'absent-Fig15' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig15} onChange={(e)=>setstateFig15(e.target.value)} disabled={absentFig15}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig15(!locatedFig15)} checked={locatedFig15} disabled={absentFig15} inputProps={{ 'aria-label': 'located-Fig15' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>16. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig16(!absentFig16)} checked={absentFig16} inputProps={{ 'aria-label': 'absent-Fig16' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig16} onChange={(e)=>setstateFig16(e.target.value)} disabled={absentFig16}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig16(!locatedFig16)} checked={locatedFig16} disabled={absentFig16} inputProps={{ 'aria-label': 'located-Fig16' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>17. Cruz inferior</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig17(!absentFig17)} checked={absentFig17} inputProps={{ 'aria-label': 'absent-Fig17' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig17} onChange={(e)=>setstateFig17(e.target.value)} disabled={absentFig17}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig17(!locatedFig17)} checked={locatedFig17} disabled={absentFig17} inputProps={{ 'aria-label': 'located-Fig17' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>18. Cuadrado con diagonal</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig18(!absentFig18)} checked={absentFig18} inputProps={{ 'aria-label': 'absent-Fig18' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateFig18} onChange={(e)=>setstateFig18(e.target.value)} disabled={absentFig18}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig18(!locatedFig18)} checked={locatedFig18} disabled={absentFig18} inputProps={{ 'aria-label': 'located-Fig18' }}/> </Grid>
                  </Grid>
                </Grid>
                <br></br>
                <Grid container justify="center" spacing={1}>
                  {alertsSave()}
                </Grid>
                <br></br>
                <CustomButton msj="Siguiente" callback={next}> </CustomButton>
              </form>
              <br></br>
              </Paper>
            </Container>      
            <br></br>
          </div>
        );
      case "evocation":
        return(
          <div>
            <br></br>            
            <Container justify="center" align="center" fixed>      
            <Paper className={classes.paper}>
            {showCopyType()}
              <br></br>
              <Typography  variant="h4">Prueba del Rey</Typography>
              <Typography  variant="body1" component="h5">Registro de resultados de evocación</Typography>
              <Divider />
              <br></br>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <Typography  variant="body1" component="h6">Paciente: {patientName}</Typography>
                </Grid>
                <Grid item>
                  <Typography  variant="body1" component="h6">ID: {patientId}</Typography>                   
                </Grid>
              </Grid>

              <br></br>
              <form align="center">
                <Grid container justify="center" spacing={2}>            
                  <TextField
                    id="date"
                    label="Fecha de la Prueba"
                    type="date"
                    value={testDate}
                    onChange={(e)=>setTestDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </Grid>

                <br></br>
                <Grid container justify="center" spacing={2}>
                  <Grid item className={classes.classTitle}> <FormLabel> Tiempo: </FormLabel> </Grid>
                  <Grid item> <TextField type="number" label="Minutos" value={minutesEvocation} onChange={(e)=>setMinutesEvocation(e.target.value)} maxLength="3" inputProps={{ 'aria-label': 'minutesEvocation', min:0, max:59 }} /> </Grid>
                  <Grid item> <TextField type="number" label="Segundos" value={secondsEvocation}  onChange={(e)=>setSecondsEvocation(e.target.value)} maxLength="2" inputProps={{ 'aria-label': 'secondsEvocation', min:0, max:59 }} /> </Grid>
                </Grid>
                <br></br>

                <Grid container justify="center">
                  <TextField  id="copyType" multiline label="Tipo de Copia" onChange={(e)=>setCopyTypeEvocation(e.target.value)} value={copyTypeEvocation} inputProps={{ 'aria-label': 'copy-type-evocation' }}/>
                  <IconButton onClick={()=>setModalControl(true)}> <HelpOutlineIcon></HelpOutlineIcon> </IconButton>
                </Grid>
                <br></br><br></br>
                <Grid container justify="center">
                  <Tooltip title="Observaciones adicionales por parte del neuropsicologo"><TextField  id="observ" multiline label="Observaciones" onChange={(e)=>setObservEvocation(e.target.value)} value={observEvocation} inputProps={{ 'aria-label': 'observations-evocation' }}/></Tooltip>
                </Grid>

                <br></br><br></br>
                <Divider  variant="middle"/>
                <Grid container justify="center">
                  <h3 align="center">Calificación de la prueba</h3>
                </Grid>
                <Grid container justify="center">
                  <img className={classes.ReyImage} src={reyImage} alt="Rey-test"/> 
                </Grid>

                <br></br><br></br>
                              
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={3} className={classes.figureName}> <FormLabel>Número </FormLabel> </Grid>
                  <Grid item xs={1} className={classes.figureName}> <FormLabel>Ausente </FormLabel> </Grid>
                  <Grid item xs={3} className={classes.figureName}> <FormLabel>Estado de la fig. </FormLabel> </Grid>
                  <Grid item xs={1} className={classes.figureName}> <FormLabel>Bien situada </FormLabel> </Grid>
                </Grid>

                <Grid container justify="center" spacing={2} className={classes.testEvaluationContainer}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>1. Cruz</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig1(!absentEvocationFig1)} checked={absentEvocationFig1} inputProps={{ 'aria-label': 'absent-EvocationFig1' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig1} onChange={(e)=>setstateEvocationFig1(e.target.value)} disabled={absentEvocationFig1}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig1(!locatedEvocationFig1)} checked={locatedEvocationFig1} disabled={absentEvocationFig1} inputProps={{ 'aria-label': 'located-EvocationFig#i' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>2. Rect. Grande</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig2(!absentEvocationFig2)} checked={absentEvocationFig2} inputProps={{ 'aria-label': 'absent-EvocationFig2' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig2} onChange={(e)=>setstateEvocationFig2(e.target.value)} disabled={absentEvocationFig2}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig2(!locatedEvocationFig2)} checked={locatedEvocationFig2} disabled={absentEvocationFig2} inputProps={{ 'aria-label': 'located-EvocationFig2' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>3. Diagonales del rect.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig3(!absentEvocationFig3)} checked={absentEvocationFig3} inputProps={{ 'aria-label': 'absent-EvocationFig3' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig3} onChange={(e)=>setstateEvocationFig3(e.target.value)} disabled={absentEvocationFig3}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig3(!locatedEvocationFig3)} checked={locatedEvocationFig3} disabled={absentEvocationFig3} inputProps={{ 'aria-label': 'located-EvocationFig3' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>4. Línea horz.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig4(!absentEvocationFig4)} checked={absentEvocationFig4} inputProps={{ 'aria-label': 'absent-EvocationFig4' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig4} onChange={(e)=>setstateEvocationFig4(e.target.value)} disabled={absentEvocationFig4}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig4(!locatedEvocationFig4)} checked={locatedEvocationFig4} disabled={absentEvocationFig4} inputProps={{ 'aria-label': 'located-EvocationFig4' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>5. Línea vert.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig5(!absentEvocationFig5)} checked={absentEvocationFig5} inputProps={{ 'aria-label': 'absent-EvocationFig5' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig5} onChange={(e)=>setstateEvocationFig5(e.target.value)} disabled={absentEvocationFig5}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig5(!locatedEvocationFig5)} checked={locatedEvocationFig5} disabled={absentEvocationFig5} inputProps={{ 'aria-label': 'located-EvocationFig5' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>6. Rect. con diagonales</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig6(!absentEvocationFig6)} checked={absentEvocationFig6} inputProps={{ 'aria-label': 'absent-EvocationFig6' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig6} onChange={(e)=>setstateEvocationFig6(e.target.value)} disabled={absentEvocationFig6}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig6(!locatedEvocationFig6)} checked={locatedEvocationFig6} disabled={absentEvocationFig6} inputProps={{ 'aria-label': 'located-EvocationFig6' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>7. Segmento peq.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig7(!absentEvocationFig7)} checked={absentEvocationFig7} inputProps={{ 'aria-label': 'absent-EvocationFig7' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig7} onChange={(e)=>setstateEvocationFig7(e.target.value)} disabled={absentEvocationFig7}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig7(!locatedEvocationFig7)} checked={locatedEvocationFig7} disabled={absentEvocationFig7} inputProps={{ 'aria-label': 'located-EvocationFig7' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>8.  líneas paralelas</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig8(!absentEvocationFig8)} checked={absentEvocationFig8} inputProps={{ 'aria-label': 'absent-EvocationFig8' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig8} onChange={(e)=>setstateEvocationFig8(e.target.value)} disabled={absentEvocationFig8}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig8(!locatedEvocationFig8)} checked={locatedEvocationFig8} disabled={absentEvocationFig8} inputProps={{ 'aria-label': 'located-EvocationFig8' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>9. Triangulo rect.</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig9(!absentEvocationFig9)} checked={absentEvocationFig9} inputProps={{ 'aria-label': 'absent-EvocationFig9' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig9} onChange={(e)=>setstateEvocationFig9(e.target.value)} disabled={absentEvocationFig9}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig9(!locatedEvocationFig9)} checked={locatedEvocationFig9} disabled={absentEvocationFig9} inputProps={{ 'aria-label': 'located-EvocationFig9' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>10. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig10(!absentEvocationFig10)} checked={absentEvocationFig10} inputProps={{ 'aria-label': 'absent-EvocationFig10' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig10} onChange={(e)=>setstateEvocationFig10(e.target.value)} disabled={absentEvocationFig10}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig10(!locatedEvocationFig10)} checked={locatedEvocationFig10} disabled={absentEvocationFig10} inputProps={{ 'aria-label': 'located-EvocationFig10' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>11. Circulo con 3 puntos</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig11(!absentEvocationFig11)} checked={absentEvocationFig11} inputProps={{ 'aria-label': 'absent-EvocationFig11' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig11} onChange={(e)=>setstateEvocationFig11(e.target.value)} disabled={absentEvocationFig11}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig11(!locatedEvocationFig11)} checked={locatedEvocationFig11} disabled={absentEvocationFig11} inputProps={{ 'aria-label': 'located-EvocationFig11' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>12. 5 líneas paralelas</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig12(!absentEvocationFig12)} checked={absentEvocationFig12} inputProps={{ 'aria-label': 'absent-EvocationFig12' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig12} onChange={(e)=>setstateEvocationFig12(e.target.value)} disabled={absentEvocationFig12}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig12(!locatedEvocationFig12)} checked={locatedEvocationFig12} disabled={absentEvocationFig12} inputProps={{ 'aria-label': 'located-EvocationFig12' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>13. Triángulo isósceles</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig13(!absentEvocationFig13)} checked={absentEvocationFig13} inputProps={{ 'aria-label': 'absent-EvocationFig13' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig13} onChange={(e)=>setstateEvocationFig13(e.target.value)} disabled={absentEvocationFig13}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig13(!locatedEvocationFig13)} checked={locatedEvocationFig13} disabled={absentEvocationFig13} inputProps={{ 'aria-label': 'located-EvocationFig13' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>14. Rombo</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig14(!absentEvocationFig14)} checked={absentEvocationFig14} inputProps={{ 'aria-label': 'absent-EvocationFig14' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig14} onChange={(e)=>setstateEvocationFig14(e.target.value)} disabled={absentEvocationFig14}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig14(!locatedEvocationFig14)} checked={locatedEvocationFig14} disabled={absentEvocationFig14} inputProps={{ 'aria-label': 'located-EvocationFig14' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>15. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig15(!absentEvocationFig15)} checked={absentEvocationFig15} inputProps={{ 'aria-label': 'absent-EvocationFig15' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig15} onChange={(e)=>setstateEvocationFig15(e.target.value)} disabled={absentEvocationFig15}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig15(!locatedEvocationFig15)} checked={locatedEvocationFig15} disabled={absentEvocationFig15} inputProps={{ 'aria-label': 'located-EvocationFig15' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>16. Línea</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig16(!absentEvocationFig16)} checked={absentEvocationFig16} inputProps={{ 'aria-label': 'absent-EvocationFig16' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig16} onChange={(e)=>setstateEvocationFig16(e.target.value)} disabled={absentEvocationFig16}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig16(!locatedEvocationFig16)} checked={locatedEvocationFig16} disabled={absentEvocationFig16} inputProps={{ 'aria-label': 'located-EvocationFig16' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>17. Cruz inferior</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig17(!absentEvocationFig17)} checked={absentEvocationFig17} inputProps={{ 'aria-label': 'absent-EvocationFig17' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig17} onChange={(e)=>setstateEvocationFig17(e.target.value)} disabled={absentEvocationFig17}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig17(!locatedEvocationFig17)} checked={locatedEvocationFig17} disabled={absentEvocationFig17} inputProps={{ 'aria-label': 'located-EvocationFig17' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={3} className={classes.figureName}> <FormLabel>18. Cuadrado con diagonal</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentEvocationFig18(!absentEvocationFig18)} checked={absentEvocationFig18} inputProps={{ 'aria-label': 'absent-EvocationFig18' }}/> </Grid>
                    <Grid item xs={3}> 
                      <Select value={stateEvocationFig18} onChange={(e)=>setstateEvocationFig18(e.target.value)} disabled={absentEvocationFig18}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedEvocationFig18(!locatedEvocationFig18)} checked={locatedEvocationFig18} disabled={absentEvocationFig18} inputProps={{ 'aria-label': 'located-EvocationFig18' }}/> </Grid>
                  </Grid>
                </Grid>
                <br></br>
                <Grid container justify="center" spacing={1}>
                  {alertsSave()}
                </Grid>
                <br></br>
                <Grid container justify="center" spacing={1}>
                  <CustomButton msj="Anterior" callback={previous}> </CustomButton>
                  <CustomButton msj="Resumen" callback={next}> </CustomButton>
                </Grid>
              </form>
              <br></br>
              </Paper>
            </Container>      
            <br></br>
          </div>
        );
      case "results":
        return(
          <div>
            <br></br>
            <Container justify="center" align="center" fixed>      
              <Paper className={classes.paper}>
                <br></br>
                <Typography  variant="h4">Prueba del Rey</Typography>
                <Typography  variant="body1" component="h5">Resumen de la prueba</Typography>
                <Divider />
                <br></br>
                <Typography  variant="body1" component="h5">Datos del paciente</Typography>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    <Typography  variant="body1" component="h6">Paciente: {patientName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography  variant="body1" component="h6">ID: {patientId}</Typography>                   
                  </Grid>
                </Grid>
                
                <br></br>
                <Typography  variant="body1" component="h5">Resultados de copia</Typography>
                <br></br>
                <Grid container justify="center" spacing={2}>            
                  <Grid item xs={3}><TextField disabled id="date" label="Fecha de aplicación" type="date" value={testDate} className={classes.textField} InputLabelProps={{shrink: true,}}/></Grid>
                  <Grid item xs={3}><TextField disabled type="number" label="Tiempo (segundos)" value={time} inputProps={{ 'aria-label': 'timeResult', min:0, max:59 }} /> </Grid>
                  <Grid item xs={2}><TextField disabled type="number" label="Puntuación" value={score} inputProps={{ 'aria-label': 'score' }} /> </Grid>
                </Grid>
                
                <br></br>
                <Typography  variant="body1" component="h5">Resultados de evocación</Typography>
                <br></br>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={3}><TextField disabled id="date" label="Fecha de aplicación" type="date" value={testDate} className={classes.textField} InputLabelProps={{shrink: true,}}/></Grid>
                  <Grid item xs={3}><TextField disabled label="Tiempo (segundos)" value={timeEvocation} inputProps={{ 'aria-label': 'timeEvocationResult', min:0, max:59 }} /> </Grid>
                  <Grid item xs={2}><TextField disabled label="Puntuación" value={scoreEvocation} inputProps={{ 'aria-label': 'scoreEvocation' }} /> </Grid>
                </Grid>

                <br></br>
                <Grid container justify="center" spacing={2}>
                  <CustomButton msj="Anterior" callback={previous}> </CustomButton>
                  <Link to={'/home'}> <CustomButton msj="Guardar resultados" /> </Link>
                </Grid>
              </Paper>
            </Container>
          </div>
        );
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

export default King;

/*
<div>
      <br></br>
      {showResults()}
      <Container justify="center" align="center" fixed>      
      <Paper className={classes.paper}>
        <br></br>
        <h1 className={classes.classTitle}>Test de Rey</h1>
        <Divider />
        <br></br>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            Paciente: {patientName}
          </Grid>
          <Grid item>
            ID: {patientId} 
          </Grid>
        </Grid>

        <br></br>
        <form align="center">
          <Grid container justify="center" spacing={2}>            
            <TextField
              id="date"
              label="Fecha de la Prueba"
              type="date"
              value={testDate}
              onChange={(e)=>setTestDate(e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <br></br>
          <Grid container justify="center" spacing={2}>
            <Grid item className={classes.classTitle}> <FormLabel> Tiempo: </FormLabel> </Grid>
            <Grid item> <TextField type="number" label="Minutos" value={minutes} onChange={(e)=>setMinutes(e.target.value)} maxLength="3" inputProps={{ 'aria-label': 'minutes', min:0, max:59 }} /> </Grid>
            <Grid item> <TextField type="number" label="Segundos" value={seconds}  onChange={(e)=>setSeconds(e.target.value)} maxLength="2" inputProps={{ 'aria-label': 'seconds', min:0, max:59 }} /> </Grid>
          </Grid>
          <br></br>

          <Grid container justify="center">
            <TextField  id="copyType" multiline label="Tipo de Copia" onChange={(e)=>setCopyType(e.target.value)} value={copyType} inputProps={{ 'aria-label': 'copy-type' }}/>
          </Grid>
          <br></br><br></br>
          <Grid container justify="center">
            <TextField  id="observ" multiline label="Observaciones" onChange={(e)=>setObserv(e.target.value)} value={observ} inputProps={{ 'aria-label': 'observations' }}/>
          </Grid>

          <br></br><br></br>
          <Divider  variant="middle"/>
          <Grid container justify="center">
            <h3 align="center">Calificación de la prueba</h3>
          </Grid>
          <Grid container justify="center">
            <img className={classes.ReyImage} src={reyImage} alt="Rey-test"/> 
          </Grid>

          <br></br><br></br><br></br>
                        
          <Grid container justify="center" spacing={2}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>Número </FormLabel> </Grid>
            <Grid item xs={1} className={classes.figureName}> <FormLabel>Ausente </FormLabel> </Grid>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>Estado de la fig. </FormLabel> </Grid>
            <Grid item xs={1} className={classes.figureName}> <FormLabel>Bien situada </FormLabel> </Grid>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>1. Cruz</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig1(!absentFig1)} checked={absentFig1} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig1} onChange={(e)=>setstateFig1(e.target.value)} disabled={absentFig1}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig1(!locatedFig1)} checked={locatedFig1} disabled={absentFig1} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>2. Rect. Grande</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig2(!absentFig2)} checked={absentFig2} inputProps={{ 'aria-label': 'absent-Fig2' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig2} onChange={(e)=>setstateFig2(e.target.value)} disabled={absentFig2}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig2(!locatedFig2)} checked={locatedFig2} disabled={absentFig2} inputProps={{ 'aria-label': 'located-Fig2' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>3. Diagonales del rect.</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig3(!absentFig3)} checked={absentFig3} inputProps={{ 'aria-label': 'absent-Fig3' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig3} onChange={(e)=>setstateFig3(e.target.value)} disabled={absentFig3}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig3(!locatedFig3)} checked={locatedFig3} disabled={absentFig3} inputProps={{ 'aria-label': 'located-Fig3' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>4. Línea horz.</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig4(!absentFig4)} checked={absentFig4} inputProps={{ 'aria-label': 'absent-Fig4' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig4} onChange={(e)=>setstateFig4(e.target.value)} disabled={absentFig4}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig4(!locatedFig4)} checked={locatedFig4} disabled={absentFig4} inputProps={{ 'aria-label': 'located-Fig4' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>5. Línea vert.</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig5(!absentFig5)} checked={absentFig5} inputProps={{ 'aria-label': 'absent-Fig5' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig5} onChange={(e)=>setstateFig5(e.target.value)} disabled={absentFig5}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig5(!locatedFig5)} checked={locatedFig5} disabled={absentFig5} inputProps={{ 'aria-label': 'located-Fig5' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>6. Rect. con diagonales</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig6(!absentFig6)} checked={absentFig6} inputProps={{ 'aria-label': 'absent-Fig6' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig6} onChange={(e)=>setstateFig6(e.target.value)} disabled={absentFig6}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig6(!locatedFig6)} checked={locatedFig6} disabled={absentFig6} inputProps={{ 'aria-label': 'located-Fig6' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>7. Segmento peq.</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig7(!absentFig7)} checked={absentFig7} inputProps={{ 'aria-label': 'absent-Fig7' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig7} onChange={(e)=>setstateFig7(e.target.value)} disabled={absentFig7}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig7(!locatedFig7)} checked={locatedFig7} disabled={absentFig7} inputProps={{ 'aria-label': 'located-Fig7' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>8.  líneas paralelas</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig8(!absentFig8)} checked={absentFig8} inputProps={{ 'aria-label': 'absent-Fig8' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig8} onChange={(e)=>setstateFig8(e.target.value)} disabled={absentFig8}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig8(!locatedFig8)} checked={locatedFig8} disabled={absentFig8} inputProps={{ 'aria-label': 'located-Fig8' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>9. Triangulo rect.</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig9(!absentFig9)} checked={absentFig9} inputProps={{ 'aria-label': 'absent-Fig9' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig9} onChange={(e)=>setstateFig9(e.target.value)} disabled={absentFig9}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig9(!locatedFig9)} checked={locatedFig9} disabled={absentFig9} inputProps={{ 'aria-label': 'located-Fig9' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>10. Línea</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig10(!absentFig10)} checked={absentFig10} inputProps={{ 'aria-label': 'absent-Fig10' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig10} onChange={(e)=>setstateFig10(e.target.value)} disabled={absentFig10}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig10(!locatedFig10)} checked={locatedFig10} disabled={absentFig10} inputProps={{ 'aria-label': 'located-Fig10' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>11. Circulo con 3 puntos</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig11(!absentFig11)} checked={absentFig11} inputProps={{ 'aria-label': 'absent-Fig11' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig11} onChange={(e)=>setstateFig11(e.target.value)} disabled={absentFig11}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig11(!locatedFig11)} checked={locatedFig11} disabled={absentFig11} inputProps={{ 'aria-label': 'located-Fig11' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>12. 5 líneas paralelas</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig12(!absentFig12)} checked={absentFig12} inputProps={{ 'aria-label': 'absent-Fig12' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig12} onChange={(e)=>setstateFig12(e.target.value)} disabled={absentFig12}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig12(!locatedFig12)} checked={locatedFig12} disabled={absentFig12} inputProps={{ 'aria-label': 'located-Fig12' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>13. Triángulo isósceles</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig13(!absentFig13)} checked={absentFig13} inputProps={{ 'aria-label': 'absent-Fig13' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig13} onChange={(e)=>setstateFig13(e.target.value)} disabled={absentFig13}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig13(!locatedFig13)} checked={locatedFig13} disabled={absentFig13} inputProps={{ 'aria-label': 'located-Fig13' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>14. Rombo</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig14(!absentFig14)} checked={absentFig14} inputProps={{ 'aria-label': 'absent-Fig14' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig14} onChange={(e)=>setstateFig14(e.target.value)} disabled={absentFig14}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig14(!locatedFig14)} checked={locatedFig14} disabled={absentFig14} inputProps={{ 'aria-label': 'located-Fig14' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>15. Línea</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig15(!absentFig15)} checked={absentFig15} inputProps={{ 'aria-label': 'absent-Fig15' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig15} onChange={(e)=>setstateFig15(e.target.value)} disabled={absentFig15}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig15(!locatedFig15)} checked={locatedFig15} disabled={absentFig15} inputProps={{ 'aria-label': 'located-Fig15' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>16. Línea</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig16(!absentFig16)} checked={absentFig16} inputProps={{ 'aria-label': 'absent-Fig16' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig16} onChange={(e)=>setstateFig16(e.target.value)} disabled={absentFig16}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig16(!locatedFig16)} checked={locatedFig16} disabled={absentFig16} inputProps={{ 'aria-label': 'located-Fig16' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>17. Cruz inferior</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig17(!absentFig17)} checked={absentFig17} inputProps={{ 'aria-label': 'absent-Fig17' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig17} onChange={(e)=>setstateFig17(e.target.value)} disabled={absentFig17}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig17(!locatedFig17)} checked={locatedFig17} disabled={absentFig17} inputProps={{ 'aria-label': 'located-Fig17' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} className={classes.figureName}> <FormLabel>18. Cuadrado con diagonal</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setabsentFig18(!absentFig18)} checked={absentFig18} inputProps={{ 'aria-label': 'absent-Fig18' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig18} onChange={(e)=>setstateFig18(e.target.value)} disabled={absentFig18}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" onChange={(e)=>setlocatedFig18(!locatedFig18)} checked={locatedFig18} disabled={absentFig18} inputProps={{ 'aria-label': 'located-Fig18' }}/> </Grid>
          </Grid>
          <br></br>
          <Grid container justify="center" spacing={1}>
            {alertsSave()}
          </Grid>
          <br></br>
          <CustomButton msj="Guardar" callback={save}> </CustomButton>
        </form>

        <br></br>
        </Paper>
      </Container>      
      <br></br>
    </div>

*/