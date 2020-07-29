import React, { useState, useEffect,useRef } from "react";
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
import Peer from "simple-peer";
//import RecordRTC from 'recordrtc';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

let socket = io(ENDPOINT);
let peer

let type="doctor"

const verbal= ["CIERRE LOS OJOS","SAQUE LA LENGUA","ABRA Y CIERRE LA MANO"]
const repeticion= ["CEREBRO","PENSAMIENTO","LENGUAJE"]
const lectura= ["OSCURO","LA LLAVE DEL CARRO"]
const instrucciones= ["EN LA IMAGEN HAY UN ANCIANO","EN LA IMAGEN HAY UN CIRCULO","EN LA IMAGEN HAY UN CARRO","EN LA IMAGEN HAY UN AVION"]

let results = [0,0,0,0,0,0]

let lobulo = "Derecho"
let aphasiaChecked =[]
let test = ["Conteo","Denominacion","Instrucciones verbales","Repeticion","Lectura","Seguimiento de instrucciones"]
let actualTest = -1;
let aphasias = ["Paresia de miembro superior","Oftalmoplegia","Paralisis facial","Disartria"]
let aphasias2 = ["Afasia aferente","Afasia eferente","Afasia mixta"]

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


function Wada() { 
  const [state, setState] = useState("intro");
  const [stimuli, setStimuli] = useState(6);
  const [seconds, setSeconds] = useState(0);
  const [stream, setStream] = useState();
  const [isActive, setIsActive] = useState(false);
  const [selectedTest, setSelectedTest] = useState([true,true,true ,true,true,true]);
  
  const classes = useStyles();

  const partnerVideo = useRef();
  

  function join(typeIn){ 
    socket.emit('join', { type:typeIn ,test:"1111" }, (error) => {
      if(error) {
        alert(error);
      }
      
    });
    type=typeIn
  }

  function getTotal(lobulo){
    let total = 0
    for (let i = 0; i < test.length; i++) {
      total+= results[i]
      
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

    setIsActive(false)
    return "fin"
  }

  function next(limit,score){
    
    results[actualTest]=results[actualTest]+score;
    

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

  useEffect(()=>{

    if(stream!==undefined && type==='paciente')socket.emit("videoConnect")

    
      
    socket.on('connect-all',()=>{

      if((stream!==undefined && type==='paciente' )|| type==="doctor" ){
        

        if(type==="paciente")peer = new Peer({ initiator: true,trickle: false, stream: stream })
        else{
          peer = new Peer();
          peer.on('stream', function (stream) {
            
            if (partnerVideo.current) {
              partnerVideo.current.srcObject = stream;
            }
          });
        }

        peer.on('signal', data => {
          socket.emit("sendSignal",data)
        })
      }
    
    })
  },[stream])

  useEffect(() => {

      socket.on('sendSignal',(data)=> peer.signal(data))

      socket.on('activateStream',()=> {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          setStream(stream);
          
        })
      })

      socket.on('state', estado => {
        if(type==="doctor" && estado.text==="fin"){
          setState("results");
          setIsActive(false)
        }
        else setState(estado.text);

        setStimuli(1)
      });

      socket.on('stimuli', estado => {
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
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
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
          callback={()=>setState("start")}
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
          change={()=>socket.emit("activateStream",()=>socket.emit("setTestWada",nextTest(),()=>setIsActive(true)))}
        ></TestStart>)
          
      case "Conteo":
        return(<div className={clsx({
          [classes.h1]:type==='paciente'
        })}>
          <h1> Cuente de 1 a 20...</h1>
          {type==="doctor"?
          <div>            
              <CustomButton
              msj="Correcto"
              callback={()=>next(1,1)}
              ></CustomButton>
              <CustomButton
              msj="Incorrecto"
              callback={()=>next(1,0)}
              ></CustomButton>
              <p>Indique si se presenta alguno de los siguientes eventos:</p>
              
              {aphasias.map((x,i)=><CustomButton
              key={i}
              msj={x}
              callback={()=>aphasiaChecked.push([x,seconds])}
              ></CustomButton>)}
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
        {type==="doctor"?
        <div>
          <h1>{verbal[stimuli-1]}</h1>
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
        {type==="doctor"?
        <div>
          <h1>{repeticion[stimuli]}</h1>
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
            {type==="doctor"?<img
            alt={"Estimulo #"+stimuli}      
            width="100%"
            src={require('../../assets/estimulos/wada/instruc.png')}
            />:null}
            {type==="doctor"?
            <div>
                <h1>{instrucciones[stimuli]}</h1>
                <h1>{stimuli===3 ||stimuli===0 ? "Respuesta correcta: Si":"Respuesta correcta: No"}</h1>
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
                  <TableCell align="center">Resultados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {test.map((name,index) => 
                  selectedTest[index]?<TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="center">{results[index]}</TableCell>
                  </TableRow>:null
                )}
                <TableRow >
                    <TableCell component="th" scope="row">
                      Total
                    </TableCell>
                    <TableCell align="center">{getTotal()}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            </TableContainer>
            <h1>Eventos Registradas</h1>
            {aphasiaChecked.length!==0?<TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell >Afasia</TableCell>
                  <TableCell align="center">Tiempo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aphasiaChecked.map((aphasia,index) => 
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
            <h1>Afasias</h1>
            <FormControl required component="fieldset">
            <FormLabel component="legend">Selecciona las afasias presentadas durante la prueba:</FormLabel>
            <FormGroup>
              {aphasias2.map((x,index)=>
                <FormControlLabel
                  key={index}
                  control={
                  <Checkbox color="primary" 
                    onChange={(event)=>didAphasia(aphasias2[index],event.target.checked)}
                  />}
                  label={aphasias2[index]}
                />
              )}
            </FormGroup>
          </FormControl>
          <br/>
          <CustomButton
            msj="Guardar Resultados"
            callback={()=>console.log("Guardado")}
          />
          </div>)

      default:
        break;
    }

  }

  function didAphasia(name,bool){
    if(bool){
      aphasiaChecked.push([name,null])
    }
    else{
      var index = aphasiaChecked.findIndex((x)=>name===x[0]);
      if (index > -1) {
        aphasiaChecked.splice(index, 1);
      }
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
      {type==="doctor" && isActive ? <video className={classes.video} playsInline ref={partnerVideo} autoPlay /> :null}
      {type==="doctor" && isActive ? <h2>{cronometer()}</h2>:null}
      {body()}
    </div>
    
  );
}

export default Wada;