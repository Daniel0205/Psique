import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import Divider from '@material-ui/core/Divider';
import {Link} from "react-router-dom";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import reyImage from '../../assets/ReyTest/ReyImage.png';
import Background from '../../assets/Fondo/FondoNubes.jfif';

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
    /*background-color: dodgerblue;*/
  },
  ReyImage: {
    backgroundImage: "url(" + reyImage + ")",
    backgroundSize: "cover",
  },

  reyTestpage: {
    backgroundImage: "url(" + Background + ")",
    width: '100%',
    margin: 0,
    backgroundSize: "cover",
  },
  snackbarStyle: {
    color: "white",
    alignSelf: "center",
    backgroundColor: '#F55448',
    width: '50%',
  },
  alingContents: {
    alingContents: 'center',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


function King() {
  const classes = useStyles();  

  var patientName = "Juan Pablo Prueba";
  var patientId = "0";

  const [testDate, setTestDate] = React.useState(new Date());
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
  
  var maxMinutes = 60;
  var [score, setScore] = useState(0);
  var [time, setTime] = useState(0);
  var [modalControl, setModalControl] = useState(false);

  var [alertController, setAlertController] = useState(0); //0: nothing; 1: alertTime; 2: alertMinutes; 3: alertSeconds

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

  function save(){
    setAlertController(0);    
    if((minutes >= 0) || (minutes <= maxMinutes)){
      if((seconds >= 0) || (seconds < 60)){
        setTime((minutes*60) + seconds);

        if(time > 0){
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
  }

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
      case 0:
        return;
      break;

      case 1:        
        return customAlert('Tiempo Inválido');
      break;

      case 2:
        return customAlert('Segundos Inválidos');
      break;

      case 3:
        return customAlert('Minutos Inválidos');
      break;
    }
  }

  const handleDateChange = (date) => {
    setTestDate(date);
  };  

  function showResults(){
    return(
      <div>
        <Dialog aria-labelledby="simple-dialog-title" open={modalControl}>
          <DialogTitle id="simple-dialog-title">Por favor confirme los resultados</DialogTitle>
          <Divider />
            <DialogContent>              
              <DialogContentText>Paciente: {patientName} </DialogContentText>
              <DialogContentText>ID: {patientId}</DialogContentText>
              <br></br>
              <DialogContentText> Fecha: {testDate} </DialogContentText>
              <DialogContentText >Tiempo (segundos): {time}</DialogContentText>
              <DialogContentText >Puntaje: {score}</DialogContentText>
              <br></br>
              <DialogContent>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={4}> <Link to={'/home'}><Button variant="contained" color="primary">Sí</Button></Link> </Grid>
                  <Grid item xs={4}> <Button variant="contained" color="secondary" onClick={() => {setModalControl(false)}}>No</Button> </Grid>
                </Grid>
              </DialogContent>
            </DialogContent>
        </Dialog>    
      </div>
    );
  }

  return (   
    <div className={classes.reyTestpage}>
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
            <Grid item> <FormLabel> Tiempo: </FormLabel> </Grid>
            <Grid item> <TextField required label="Minutos" value={minutes} onChange={(e)=>setMinutes(e.target.value)} maxLength="3" inputProps={{ 'aria-label': 'minutes' }} /> </Grid>
            <Grid item> <TextField required label="Segundos" value={seconds}  onChange={(e)=>setSeconds(e.target.value)} maxLength="2" inputProps={{ 'aria-label': 'seconds' }} /> </Grid>
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
            <img src={reyImage}/>
          </Grid>

          <br></br><br></br><br></br>
                        
          <Grid container justify="center" spacing={2}>
            <Grid item xs={1}> <FormLabel>No. </FormLabel> </Grid>
            <Grid item xs={1}> <FormLabel>Ausente </FormLabel> </Grid>
            <Grid item xs={3}> <FormLabel>Estado de la fig. </FormLabel> </Grid>
            <Grid item xs={1}> <FormLabel>Bien situada </FormLabel> </Grid>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item xs={1}> <FormLabel>1</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig1(!absentFig1)} checked={absentFig1} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig1} onChange={(e)=>setstateFig1(e.target.value)} disabled={absentFig1}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig1(!locatedFig1)} checked={locatedFig1} disabled={absentFig1} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item xs={1}> <FormLabel>2</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig2(!absentFig2)} checked={absentFig2} inputProps={{ 'aria-label': 'absent-Fig2' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig2} onChange={(e)=>setstateFig2(e.target.value)} disabled={absentFig2}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig2(!locatedFig2)} checked={locatedFig2} disabled={absentFig2} inputProps={{ 'aria-label': 'located-Fig2' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>3</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig3(!absentFig3)} checked={absentFig3} inputProps={{ 'aria-label': 'absent-Fig3' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig3} onChange={(e)=>setstateFig3(e.target.value)} disabled={absentFig3}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig3(!locatedFig3)} checked={locatedFig3} disabled={absentFig3} inputProps={{ 'aria-label': 'located-Fig3' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>4</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig4(!absentFig4)} checked={absentFig4} inputProps={{ 'aria-label': 'absent-Fig4' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig4} onChange={(e)=>setstateFig4(e.target.value)} disabled={absentFig4}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig4(!locatedFig4)} checked={locatedFig4} disabled={absentFig4} inputProps={{ 'aria-label': 'located-Fig4' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>5</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig5(!absentFig5)} checked={absentFig5} inputProps={{ 'aria-label': 'absent-Fig5' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig5} onChange={(e)=>setstateFig5(e.target.value)} disabled={absentFig5}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig5(!locatedFig5)} checked={locatedFig5} disabled={absentFig5} inputProps={{ 'aria-label': 'located-Fig5' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>6</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig6(!absentFig6)} checked={absentFig6} inputProps={{ 'aria-label': 'absent-Fig6' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig6} onChange={(e)=>setstateFig6(e.target.value)} disabled={absentFig6}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig6(!locatedFig6)} checked={locatedFig6} disabled={absentFig6} inputProps={{ 'aria-label': 'located-Fig6' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>7</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig7(!absentFig7)} checked={absentFig7} inputProps={{ 'aria-label': 'absent-Fig7' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig7} onChange={(e)=>setstateFig7(e.target.value)} disabled={absentFig7}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig7(!locatedFig7)} checked={locatedFig7} disabled={absentFig7} inputProps={{ 'aria-label': 'located-Fig7' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>8</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig8(!absentFig8)} checked={absentFig8} inputProps={{ 'aria-label': 'absent-Fig8' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig8} onChange={(e)=>setstateFig8(e.target.value)} disabled={absentFig8}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig8(!locatedFig8)} checked={locatedFig8} disabled={absentFig8} inputProps={{ 'aria-label': 'located-Fig8' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>9</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig9(!absentFig9)} checked={absentFig9} inputProps={{ 'aria-label': 'absent-Fig9' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig9} onChange={(e)=>setstateFig9(e.target.value)} disabled={absentFig9}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig9(!locatedFig9)} checked={locatedFig9} disabled={absentFig9} inputProps={{ 'aria-label': 'located-Fig9' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>10</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig10(!absentFig10)} checked={absentFig10} inputProps={{ 'aria-label': 'absent-Fig10' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig10} onChange={(e)=>setstateFig10(e.target.value)} disabled={absentFig10}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig10(!locatedFig10)} checked={locatedFig10} disabled={absentFig10} inputProps={{ 'aria-label': 'located-Fig10' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>11</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig11(!absentFig11)} checked={absentFig11} inputProps={{ 'aria-label': 'absent-Fig11' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig11} onChange={(e)=>setstateFig11(e.target.value)} disabled={absentFig11}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig11(!locatedFig11)} checked={locatedFig11} disabled={absentFig11} inputProps={{ 'aria-label': 'located-Fig11' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>12</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig12(!absentFig12)} checked={absentFig12} inputProps={{ 'aria-label': 'absent-Fig12' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig12} onChange={(e)=>setstateFig12(e.target.value)} disabled={absentFig12}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig12(!locatedFig12)} checked={locatedFig12} disabled={absentFig12} inputProps={{ 'aria-label': 'located-Fig12' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>13</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig13(!absentFig13)} checked={absentFig13} inputProps={{ 'aria-label': 'absent-Fig13' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig13} onChange={(e)=>setstateFig13(e.target.value)} disabled={absentFig13}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig13(!locatedFig13)} checked={locatedFig13} disabled={absentFig13} inputProps={{ 'aria-label': 'located-Fig13' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>14</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig14(!absentFig14)} checked={absentFig14} inputProps={{ 'aria-label': 'absent-Fig14' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig14} onChange={(e)=>setstateFig14(e.target.value)} disabled={absentFig14}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig14(!locatedFig14)} checked={locatedFig14} disabled={absentFig14} inputProps={{ 'aria-label': 'located-Fig14' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>15</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig15(!absentFig15)} checked={absentFig15} inputProps={{ 'aria-label': 'absent-Fig15' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig15} onChange={(e)=>setstateFig15(e.target.value)} disabled={absentFig15}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig15(!locatedFig15)} checked={locatedFig15} disabled={absentFig15} inputProps={{ 'aria-label': 'located-Fig15' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>16</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig16(!absentFig16)} checked={absentFig16} inputProps={{ 'aria-label': 'absent-Fig16' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig16} onChange={(e)=>setstateFig16(e.target.value)} disabled={absentFig16}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig16(!locatedFig16)} checked={locatedFig16} disabled={absentFig16} inputProps={{ 'aria-label': 'located-Fig16' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>17</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig17(!absentFig17)} checked={absentFig17} inputProps={{ 'aria-label': 'absent-Fig17' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig17} onChange={(e)=>setstateFig17(e.target.value)} disabled={absentFig17}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig17(!locatedFig17)} checked={locatedFig17} disabled={absentFig17} inputProps={{ 'aria-label': 'located-Fig17' }}/> </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={1}> <FormLabel>18</FormLabel> </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setabsentFig18(!absentFig18)} checked={absentFig18} inputProps={{ 'aria-label': 'absent-Fig18' }}/> </Grid>
            <Grid item xs={3}> 
              <Select value={stateFig18} onChange={(e)=>setstateFig18(e.target.value)} disabled={absentFig18}> 
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={1}> <Checkbox color="primary" color="primary" onChange={(e)=>setlocatedFig18(!locatedFig18)} checked={locatedFig18} disabled={absentFig18} inputProps={{ 'aria-label': 'located-Fig18' }}/> </Grid>
          </Grid>
          <br></br>
          <Grid container justify="center" spacing={1}>
            {alertsSave()}
          </Grid>
          <br></br>
          <Button variant="contained" color="primary" onClick={() => {save()}}>Guardar</Button>            
        </form>

        <br></br>
        </Paper>
      </Container>      
      <br></br>
    </div>
  );
}

export default King;
