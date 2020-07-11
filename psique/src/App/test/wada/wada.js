import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import CustomButton from '../../components/customButton'
import TestStart from '../../components/testStart'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import update from 'react-addons-update';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const ENDPOINT = 'localhost:5000/';

let socket = io(ENDPOINT);

let type="doctor"

const verbal= ["CIERRE LOS OJOS","SAQUE LA LENGUA","OPRIMA EL BOTÓN DOS VECES"]
const lectura= ["OSCURO","LLAVE"]

let resultsRight = [0,0,0,0,0,0]
let resultsLeft = [0,0,0,0,0,0]

let lobulo = "Derecho"
let aphasiaRight =[]
let aphasiaLeft =[]
let test = ["Conteo","Denominacion","Instrucciones verbales","Repeticion","Lectura","Seguimiento de instrucciones"]
let actualTest = -1;
let lobuloChecked = false

const useStyles = makeStyles({
  h1: {
    fontSize: "200%",
    paddingTop: "20%"
  },
  root:{
    textAlign:"center"
  }
});


function Wada() {
  const [state, setState] = useState("intro");
  const [stimuli, setStimuli] = useState(6);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTest, setSelectedTest] = useState([true,true,true ,true,true,true]);
  const classes = useStyles();
  

  function join(typeIn){ 
    socket.emit('join', { type:typeIn ,test:"1111" }, (error) => {
      if(error) {
        alert(error);
      }
    });
    type=typeIn
  }

  function didAPhasia(type){
    if(lobulo==="Derecho")aphasiaRight.push([type,Math.trunc(seconds/60)+" minutes "+seconds%60+" second"])
    else aphasiaLeft.push([type,Math.trunc(seconds/60)+" minutes "+seconds%60+" second"])
  }

  function getTotal(lobulo){
    let total = 0
    for (let i = 0; i < test.length; i++) {
      if(lobulo==="Derecho")total+= resultsRight[i]
      else total+= resultsLeft[i]
    }
    return total
  }

  function getWidth(){
    if(type==="doctor") return "100%"
    switch (stimuli) {
      case 1:
        return "100%"
      case 2:
      case 3:
        return "50%"
      case 4:
        return "70%"
      case 5:
        return "100%"
      case 6:
        return "80%"
    
      default:
        break;
    }
  }

  function nextTest(){
    for (let i = actualTest+1; i < selectedTest.length; i++) {
      if(selectedTest[i]) {
        actualTest=i
        return test[i]
      }
    }
    if(lobuloChecked){
      setIsActive(false)
      return "fin"
    }
    else{
      lobuloChecked=true
      if(lobulo==="Derecho")lobulo="Izquierdo"
      else lobulo="Derecho"
      actualTest=-1
      return "waiting start"
    }
  }

  function next(limit,score){
    
    if(lobulo==="Derecho")resultsRight[actualTest]=resultsRight[actualTest]+score;
    else resultsLeft[actualTest]=resultsLeft[actualTest]+score;

    if(stimuli<limit){
      socket.emit("setStimuliWada",stimuli+1)
      setStimuli(stimuli+1)
    }
    else {
      socket.emit("setTestWada",nextTest())              
    }
    
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);



  useEffect(() => {

      socket.on('message', message => {
        console.log(message)
      });


      socket.on('state', estado => {
        console.log(estado)
        setState(estado.text);
        if(estado.text==="results")setIsActive(false)
        setStimuli(1)
      });

      socket.on('stimuli', estado => {
        console.log(estado)
        setStimuli(estado.text);
      });


  }, []);

  
 
  function body(){
    
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
        if(type==="doctor")return<div className={classes.h1}><h1>Esperando al usuario paciente </h1></div>
        else return<div className={classes.h1}><h1>Esperando al usuario doctor </h1></div>
      
      case "waiting start":
        return<div className={classes.h1}><h1>Esperando que el doctor inicie la prueba </h1></div>
      
      case "fin":
        return<div className={classes.h1}><h1>Fin de la Prueba</h1></div>
    
      case "select":
        return(<div>
          <h1>Test de Wada</h1>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Selecciona las pruebas a aplicar:</FormLabel>
            <FormGroup>
              {selectedTest.map((x,index)=>
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={x} color="primary" 
                  onChange={(event)=>setSelectedTest(update(selectedTest,{
                    [index]: {
                      $set: event.target.checked
                    }}))
                    }/>}
                  label={test[index]}
                />
              )}
            </FormGroup>
            {selectedTest.findIndex(x=>x)===-1?<FormHelperText>Debe seleccionar al menos una prueba</FormHelperText>:null}
          </FormControl>
          <CustomButton
          msj="Siguiente"
          callback={()=>setState("brain")}
          disabled={selectedTest.findIndex(x=>x)===-1}
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
                setState("start")
              }}
              ></CustomButton>

            <CustomButton
              msj="Lobulo Izquierdo"
              callback={()=>{
                lobulo="Izquierdo"
                setState("start")
              }}
            ></CustomButton>
          </div>)
      case "start":
        return(<TestStart
          name={"Wada-"+lobulo}
          change={()=>socket.emit("setTestWada",nextTest(),()=>setIsActive(true))}
        ></TestStart>)
        
      case "Conteo":
        return(<div className={clsx({
          [classes.h1]:type==='paciente'
        })}>
          <h1> Cuente de 1 a 20...</h1>
          {type==="doctor"?
          <div>
            <p>Indique que el tipo de afasia al momento que la experimenta:</p>
              <CustomButton
              msj="Afasia 1"
              callback={()=>didAPhasia("Afasia 1")}
              ></CustomButton>
              <CustomButton
              msj="Afasia 2"
              callback={()=>didAPhasia("Afasia 2")}
              ></CustomButton>
              <CustomButton
              msj="Afasia 3"
              callback={()=>didAPhasia("Afasia 3")}
              ></CustomButton>
              <CustomButton
              msj="Afasia 4"
              callback={()=>didAPhasia("Afasia 4")}
              ></CustomButton>

              <CustomButton
              msj="Correcto"
              callback={()=>next(1,1)}
              ></CustomButton>
              <CustomButton
              msj="Incorrecto"
              callback={()=>next(1,0)}
              ></CustomButton>
          </div>:null}
        </div>)
  case "Denominacion":
    return(<div>
      <img
      alt={"Estimulo #"+stimuli}      
      width={getWidth()}
      src={require('../../assets/estimulos/wada/'+stimuli+".jpeg")}
      />
      {type==="doctor"?
      <div>
         <CustomButton
          msj="Correcto"
          callback={()=>next(6,1)}
          ></CustomButton>
          <CustomButton
          msj="Incorrecto"
          callback={()=>next(6,0)}
          ></CustomButton>
      </div>:null}
    </div>)
    case "Instrucciones verbales":
      return(<div className={clsx({
        [classes.h1]:type==='paciente'
      })}>
        <h1>{verbal[stimuli-1]}</h1>
        {type==="doctor"?
        <div>
           <CustomButton
            msj="Correcto"
            callback={()=>next(3,1)}
            ></CustomButton>
            <CustomButton
            msj="Incorrecto"
            callback={()=>next(3,0)}
            ></CustomButton>
        </div>:null}
      </div>)
    case "Repeticion":
      return(<div className={clsx({
        [classes.h1]:type==='paciente'
      })}>
        <h1>CEREBRO-PENSAMIENTO</h1>
        {type==="doctor"?
        <div>
            <CustomButton
            msj="0 Puntos"
            callback={()=>next(1,0)}
            ></CustomButton>
            <CustomButton
            msj="1 Punto"
            callback={()=>next(1,1)}
            ></CustomButton>
            <CustomButton
            msj="2 Puntos"
            callback={()=>next(1,2)}
            ></CustomButton>
            <CustomButton
            msj="3 Puntos"
            callback={()=>next(1,3)}
            ></CustomButton>
        </div>:null}
      </div>)
      case "Lectura":
          return(<div className={clsx({
            [classes.h1]:type==='paciente'
          })}>
            <h1>{lectura[stimuli-1]}</h1>
            {type==="doctor"?
            <div>
               <CustomButton
                msj="Correcto"
                callback={()=>next(2,1)}
                ></CustomButton>
                <CustomButton
                msj="Incorrecto"
                callback={()=>next(2,0)}
                ></CustomButton>
            </div>:null}
          </div>)
      case "Seguimiento de instrucciones":
          return(<div className={clsx({
            [classes.h1]:type==='paciente'
          })}>
            <img
            alt={"Estimulo #"+stimuli}      
            width="100%"
            src={require('../../assets/estimulos/wada/instruc.png')}
            />
            {type==="doctor"?
            <div>
                <CustomButton
                msj="Correcto"
                callback={()=>next(3,1)}
                ></CustomButton>
                <CustomButton
                msj="Incorrecto"
                callback={()=>next(3,0)}
                ></CustomButton>
            </div>:null}
          </div>)

        case "results":
          return(<div>
            <h1>Resultados</h1>
            <h2>Tiempo empleado: {cronometer()}</h2>
            <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell >Subtest</TableCell>
                  <TableCell align="center">Lobulo Derecho</TableCell>
                  <TableCell align="center">Lobulo Izquierdo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {test.map((name,index) => 
                  selectedTest[index]?<TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="center">{resultsRight[index]}</TableCell>
                    <TableCell align="center">{resultsLeft[index]}</TableCell>
                  </TableRow>:null
                )}
                <TableRow >
                    <TableCell component="th" scope="row">
                      Total
                    </TableCell>
                    <TableCell align="center">{getTotal("Derecho")}</TableCell>
                    <TableCell align="center">{getTotal("Izquierdo")}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
            <h1>Afasias Registradas-Lobulo Derecho</h1>
            {aphasiaRight.length!==0?<TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell >Afasia</TableCell>
                  <TableCell align="center">Tiempo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aphasiaRight.map((aphasia,index) => 
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {aphasia[0]}
                    </TableCell>
                    <TableCell align="center">{aphasia[1]}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </TableContainer>:<p>No afasias registradas</p>}
            <h1>Afasias Registradas-Lobulo Izquierdo</h1>
            {aphasiaLeft.length!==0?<TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell >Afasia</TableCell>
                  <TableCell align="center">Tiempo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aphasiaLeft.map((aphasia,index) => 
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {aphasia[0]}
                    </TableCell>
                    <TableCell align="center">{aphasia[1]}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </TableContainer>:<p>No afasias registradas</p>}
          </div>)

      default:
        break;
    }

  }

  function cronometer(){
    
    let aux = ""
    let minutes = Math.trunc(seconds/60)
    if(minutes<10) aux+="0"+minutes
    else aux+=minutes

    aux+=":"

    if((seconds%60)<10) aux+="0"+seconds%60
    else aux+=seconds%60

    return aux
  }

 
  return (
    <div className={classes.root}>
      {type==="doctor" && isActive ? <h2>{cronometer()}</h2>:null}
      {body()}
    </div>
    
  );
}

export default Wada;