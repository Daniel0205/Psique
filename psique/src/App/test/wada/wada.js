import React, { useState, useEffect,useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { makeStyles } from '@material-ui/core/styles';

import Conteo from './subtest/conteo'
import Denominacion from './subtest/denominacion'
import Verbales from './subtest/verbales'
import Repeticion from './subtest/repeticion'
import Lectura from './subtest/lectura'
import Instrucciones from './subtest/instrucciones'
import ResultsWada from './resultsWada'
import StartWada from './startTest'
import RecordRTC from 'recordrtc'

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

let socket = io(ENDPOINT);
let peer
let recorder

let type="paciente"

let results = [0,0,0,0,0,0]
let aphasias =[]

let test = ["Conteo","Denominacion","Instrucciones verbales","Repeticion","Lectura","Seguimiento de instrucciones"]
let actualTest = -1;
let propofol=0;

const useStyles = makeStyles({
  root:{
    textAlign:"center"
  },
  video:{
    width: "90%",
    maxWidth: "300px"
  },
  div:{
    fontSize: "xxx-large"
  },
  h1:{
      paddingTop: "20%"
  }
});


function Wada() { 
  const [state, setState] = useState("intro");
  const [stimuli, setStimuli] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [stream, setStream] = useState();
  const [isActive, setIsActive] = useState(false);
  const [selectedTest, setSelectedTest] = useState([true,true,true ,true,true,true]);
  
  const classes = useStyles();  

  const partnerVideo = useRef();
  

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
    
        if(type==="paciente"){
          peer = new Peer({ initiator: true,trickle: false, stream: stream })
          peer.on('connect', () => {
            recorder =new RecordRTC(stream, {
              type: 'video',
              mimeType: 'video/webm',
            });
            recorder.startRecording();
          })
        }
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
      case "waiting":
      case "waiting start":
      case "brain":
        return(
          <StartWada
            socket={socket}
            state={state}
            stream={stream}
            type={type}
            setType={(x)=>type=x}
            test={test}
            selectedTest={selectedTest}
            setSelectedTest={(x)=>setSelectedTest(x)}
            changeTest={()=>socket.emit("activateStream",()=>socket.emit("setTestWada",nextTest(),()=>setIsActive(true)))}
          />
        )
         
      case "Conteo":
        return (
          <Conteo
          seconds={seconds}
          type={type}
          next={next}
          aphasias={aphasias}
          socket={socket}
          registerPropofol={()=>{propofol=seconds}}
          />)
      case "Denominacion":
        return (
          <Denominacion
          stimuli={stimuli}
          type={type}
          next={next}
          socket={socket}
          />)
      case "Instrucciones verbales":
        return (
          <Verbales
          stimuli={stimuli}
          type={type}
          next={next}
          socket={socket}
          />)
      case "Repeticion":
        return (
          <Repeticion
          stimuli={stimuli}
          type={type}
          next={next}
          socket={socket}
          />)
      case "Lectura":
        return (
          <Lectura
          stimuli={stimuli}
          type={type}
          next={next}
          socket={socket}
          />)
      case "Seguimiento de instrucciones":
        return (
          <Instrucciones
          stimuli={stimuli}
          type={type}
          next={next}
          socket={socket}
          />) 

      case "results":
        return (
          <ResultsWada
          cronometer={cronometer}
          results={results}
          selectedTest={selectedTest}
          aphasias={aphasias}
          test={test}
          propofol={propofol}
          />) 
    
      case "fin":
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        recorder.stopRecording(function() {
          socket.emit("stopRecording", recorder.getBlob());
         
        });
        return<div className={classes.div}><h1 className={classes.h1}>Fin de la Prueba</h1></div>
    
      default:
        break;
    }

  }

  return (
    <div className={classes.root}>
      {type==="doctor" && isActive ? <video className={classes.video} playsInline ref={partnerVideo} autoPlay /> :null}
      {type==="doctor" && isActive ? <h2>{cronometer()}</h2>:null}
      {body()}
    </div>
    
  );
}


export default (Wada);