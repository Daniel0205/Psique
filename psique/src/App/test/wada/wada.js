import React, { useState, useEffect,useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../../store/body/action";
import { connect } from "react-redux";


import Conteo from './subtest/conteo'
import Denominacion from './subtest/denominacion'
import Verbales from './subtest/verbales'
import Repeticion from './subtest/repeticion'
import Lectura from './subtest/lectura'
import Instrucciones from './subtest/instrucciones'
import ResultsWada from './resultsWada'
import StartWada from './startTest'
import RecordRTC from 'recordrtc'
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation ($wadaData:WadaIn!,$id_assessment:ID!,$aphasiasData:[Aphasia!]) {
    createWada(wadaData:$wadaData,id_assessment:$id_assessment,aphasiasData:$aphasiasData){
      id
      error{
        path
        message
      }
    }
  }
`;

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

let socket = io(ENDPOINT);
let peer
let recorder
let blob

let type="paciente"
let hemisphere={Derecho:"D",Izquierdo:"I",Preliminar:"P"}

let results = [0,0,0,0,0,0]
let aphasias =[]
let testNames = ["counting","denomination","verbal_instructions",
                "repetition","lecture","follow_instructions"]

let test = ["Conteo","Denominacion","Instrucciones verbales","Repeticion","Lectura","Seguimiento de instrucciones"]
let actualTest = -1;
let propofol=0;
let lobulo;

const useStyles = makeStyles({
  root:{
    textAlign:"center"
  },
  video:{
    width: "90%",
    maxWidth: "300px"
  },
  videoPatient:{
    display:"none"
  },
  div:{
    fontSize: "xxx-large"
  },
  h1:{
      paddingTop: "20%"
  }
});


function Wada(props) { 
  const [state, setState] = useState("intro");
  const [stimuli, setStimuli] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [stream, setStream] = useState();
  const [isActive, setIsActive] = useState(false);
  const [selectedTest, setSelectedTest] = useState([true,true,true ,true,true,true]);
  const [createWada] = useMutation(ADD_TODO);
  

  const classes = useStyles();  

  const partnerVideo = useRef();


  async function save(){
    let wadaData=(lobulo!=="Preliminar"?
                  {
                    hemisphere:hemisphere[lobulo],
                    propofol_aplication:propofol,
                    duration:seconds
                  }:{
                    hemisphere:hemisphere[lobulo],
                    duration:seconds
                  })
    
    for (let i = 0; i < selectedTest.length; i++) {
      if(selectedTest[i])wadaData[testNames[i]]=results[i]
    }    
    const {data}= await createWada({ variables:{ wadaData:wadaData, id_assessment:props.id_assessment,aphasiasData:aphasias}});
    

    if (data.createWada.id) {
      socket.emit("stopRecording", blob,data.createWada.id);
      props.setBody("init")     
    }
    else{
      console.log("ERROR AL ALMACENAR LOS DATO")
    }
    
    socket.emit("disconnect")

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

  useEffect(() => {
    

    function disconnect() {   
      if(type==="doctor" && state!=="results"){
          if(recorder)recorder.stopRecording();
          setState("intro")
          setStimuli(1);
          setSeconds(0);
          setIsActive(false)
          setStream();
          setSelectedTest([true,true,true ,true,true,true]);
          results = [0,0,0,0,0,0]
          actualTest = -1;
          propofol=0;
          
          if(stream){
            stream.getTracks().forEach(function(track) {
              track.stop();
            });
          }
      }
      else if(type==="paciente" ){
        if(stream){
          stream.getTracks().forEach(function(track) {
            track.stop();
          });
        }
        setStream();
        setIsActive(false)
        setState("intro")
        setStimuli(1);
      }
    }
    socket.off('disconnect')
    socket.on('disconnect', disconnect);
    /*
    socket._callbacks.$disconnect = []
    socket._callbacks.$disconnect[0] = disconnect    */
  }, [state,stream]);

  useEffect(()=>{

    if(stream!==undefined)socket.emit("videoConnect")
    
    socket.off('connect-all')
    socket.on('connect-all',()=>{
      if((stream!==undefined && type==='paciente' )|| type==="doctor" ){
        var aux = peer
        if(type==="paciente"){
          peer = new Peer({ initiator: true, stream: stream })
          peer.on('stream', function (stream) {
            setIsActive(true)
            if (partnerVideo.current) {
              partnerVideo.current.srcObject = stream;
            }
          });
          
        }
        else{
          peer = new Peer({ initiator: false, stream: stream });
          peer.on('stream', function (stream) {
            setIsActive(true)
            recorder =new RecordRTC(stream, {
              type: 'video',
              mimeType: 'video/webm',
            });
            recorder.startRecording();
            
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

  var onError = function(error) {
    
    alert( 'Error accediendo a la camara y  microfono');
  }

  useEffect(() => {
      socket.off('sendSignal')
      socket.on('sendSignal',(data)=>   peer.signal(data))

      socket.off('activateStream')
      socket.on('activateStream',()=> {
        var options;
        if(type==="doctor")options ={ video: false, audio: true }
        else options={ video: true, audio: true }

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(options).then(stream => {
            setStream(stream);
          })
        } else {
            onError();
        }
      })

      socket.off('state')
      socket.on('state', estado => {
        if(type==="doctor" && estado.text==="fin"){
          setState("results");
          setIsActive(false)
        }
        else setState(estado.text);

        setStimuli(1)
      });

      socket.off('stimuli')
      socket.on('stimuli', estado => {
        setStimuli(estado.text);
      });

      return ()=> {
        socket.disconnect()
        setStimuli(1);
        setSeconds(0);
        setIsActive(false)
        setStream();
        setSelectedTest([true,true,true ,true,true,true]);
        results = [0,0,0,0,0,0]
        actualTest = -1;
        propofol=0;
      }
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
            changeTest={()=>socket.emit("activateStream",()=>socket.emit("setTestWada",nextTest()))}
            setLobulo={(x)=>lobulo=x}
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
          lobulo={lobulo}
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
        recorder.stopRecording(function() {
          blob=recorder.getBlob();
        });
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        return (
          <ResultsWada
          cronometer={cronometer}
          results={results}
          selectedTest={selectedTest}
          aphasias={aphasias}
          test={test}
          propofol={propofol}
          lobulo={lobulo}
          saveResults={save}
          />) 
    
      case "fin":
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        socket.disconnect()
        break;
    
      default:
        break;
    }

  }

  return (
    <div className={classes.root}>
      {type==="doctor" && isActive ? <video className={classes.video} playsInline ref={partnerVideo} autoPlay /> :null}
      {type==="paciente" && isActive ? <audio  className={classes.videoPatient} autoPlay ref={partnerVideo}/> :null}
      {type==="doctor" && isActive ? <h2>{cronometer()}</h2>:null}
      {body()}
    </div>
    
  );
}

const mapStateToProps = (state) => {
  
  return {
    id_assessment: state.assessmentReducer.id_assessment,
  };
};

function mapDispatchToProps(dispatch) {
  return {
      setBody: (item) => dispatch(setBody(item)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Wada);