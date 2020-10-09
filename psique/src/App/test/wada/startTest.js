import React, {useState,useEffect} from 'react';
import CustomButton from '../../components/customButton'
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import update from 'react-addons-update';
import FormHelperText from '@material-ui/core/FormHelperText';
import TestStart from '../../components/testStart'
import { gql } from '@apollo/client';
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';

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

const GET_WADA_APPLIED = gql`
  query IsWadaDone($id_assessment: ID!,$hemisphere:String) {
    isWadaDone(id_assessment:$id_assessment,hemisphere:$hemisphere) 
  }
`;

let lobulo = "Derecho"  

function ResultsWada(props) {
    const [state, setState] = useState(props.state);
    
    const classes = useStyles(); 

    useEffect(()=>setState(props.state),[props.state])

    function join(typeIn){ 
      
      if(props.socket.disconnected) props.socket.connect()
        props.socket.emit('join', { type:typeIn ,test:props.id_assessment}, (error) => {
            if(error) {
                alert(error);
            }
        });
        props.setType(typeIn)
    }
    
    function bodyIntro(){
      
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
            if(props.type==="doctor")return<div className={classes.h1}><h1>Esperando al usuario paciente </h1></div>
            else return<div className={classes.h1}><h1>Esperando al usuario doctor </h1></div>
           
          case "waiting start":
            return<div className={classes.h1}><h1>Esperando que el doctor inicie la prueba </h1></div>
          
          case "fin":
            props.stream.getTracks().forEach(function(track) {
              track.stop();
            });
            return<div className={classes.h1}><h1>Fin de la Prueba</h1></div>
        
          case "select":
            return(<div>
              <h1>Test de Wada</h1>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Selecciona las pruebas a aplicar:</FormLabel>
                <FormGroup>
                  {props.selectedTest.map((x,index)=>
                    <FormControlLabel
                      key={index}
                      control={<Checkbox checked={x} color="primary" 
                      onChange={(event)=>props.setSelectedTest(update(props.selectedTest,{
                        [index]: {
                          $set: event.target.checked
                        }}))
                        }/>}
                      label={props.test[index]}
                    />
                  )}
                </FormGroup>
                {props.selectedTest.findIndex(x=>x)===-1?<FormHelperText>Debe seleccionar al menos una prueba</FormHelperText>:null}
              </FormControl>
              <CustomButton
              msj="Siguiente"
              callback={()=>setState("start")}
              disabled={props.selectedTest.findIndex(x=>x)===-1}
              ></CustomButton>
              <CustomButton
              msj="Atrás"
              callback={()=>setState("brain")}
              ></CustomButton>
            </div>)
            case "brain":
              return(<div>
                <h1>Test de Wada</h1>
                <p>Seleccione el hemisferio donde se aplicara el propofol:</p>
                <Query query={GET_WADA_APPLIED} variables={{ id_assessment: props.id_assessment,hemisphere:"D"}}>
                  {({ loading, error, data,variables }) => {
                    if (loading) return "Cargando";
                    if (error) return `Error! ${error}`;

                    return (
                      <CustomButton
                      msj="Hemisferio Derecho"
                      disabled={data.isWadaDone}
                      callback={()=>{
                        props.setLobulo("Derecho")
                        lobulo="Derecho"
                        setState("select")
                      }}
                      ></CustomButton>
                    );
                  }}
                </Query>

                <Query query={GET_WADA_APPLIED} variables={{ id_assessment: props.id_assessment,hemisphere:"I"}}>
                  {({ loading, error, data }) => {
                    if (loading) return "Cargando";
                    if (error) return `Error! ${error}`;

                    return (
                      <CustomButton
                      msj="Hemisferio Izquierdo"
                      disabled={data.isWadaDone}
                      callback={()=>{
                        props.setLobulo("Izquierdo")
                        lobulo="Izquierdo"
                        setState("select")
                      }}
                    ></CustomButton>
                    );
                  }}
                </Query>

                <Query query={GET_WADA_APPLIED} variables={{ id_assessment: props.id_assessment,hemisphere:"P"}}>
                  {({ loading, error, data }) => {
                    if (loading) return "Cargando";
                    if (error) return `Error! ${error}`;

                    return (
                      <CustomButton
                        msj="Evaluación Preliminar"
                        disabled={data.isWadaDone}
                        callback={()=>{
                          props.setLobulo("Preliminar")
                          lobulo="Preliminar"
                          setState("select")
                        }}
                      ></CustomButton>
                    );
                  }}
                </Query>
                
    
                
                
              </div>)
            case "start":
              return(<div>
              <TestStart
                name={"Wada-"+lobulo}
                change={props.changeTest}
              ></TestStart>
               <CustomButton
              msj="Atrás"
              callback={()=>setState("select")}
              ></CustomButton>
              </div>)
                
            default:
                break;
        }
    }

    return(bodyIntro())
}

const mapStateToProps = (state) => {
  
  return {
    id_assessment: state.assessmentReducer.id_assessment,
  };
};


export default connect(mapStateToProps)(ResultsWada);
  
