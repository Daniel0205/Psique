import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { setBody } from "../../../store/body/action";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 26

let answers = [3,2,1,5,3,4,4,1,5,2,1,5,1,3,5,2,3,1,4,2,1,5,4,2,3,4]

const useStyles = makeStyles((theme) => ({
  img:{
      width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"30%"
  },
  field:{
    paddingTop:"6%",
    
  },
  textfield:{
    width:"100%"
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

let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 
let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba

function Matrices(props) {
  const [state,setState]=useState("seleccion")
  const [stateExample,setStateExample]=useState("ejemplo1")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)

  const classes = useStyles();

  function changeStimuli(key){

    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          terminacion=0
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
            setNumberItem(flagRe)
            return 
          }
        }
        else {
          countRe=0
          terminacion++;
          setResults(update(results,{
            [numberItem-1]: {
              $set: 0
            }}))
        }        
      }
      else{
        if(1===key){

          setResults(update(results,{
            [numberItem-1]: {
              $set: 1
            }}))
          terminacion=0
        }
        else{
       
          if((numberItem===firstItem || numberItem===firstItem+1) && retornoHecho){
            retorno=true;
            flagRe=numberItem+1;
            setNumberItem(firstItem-1);
            terminacion++;
            return                        
          }
          else terminacion++;
        }
        
      }

      if(numberItem===NUMBER_STIMULI || (numberItem===1 && retornoHecho) || terminacion===LIMIT_ERROR){
        if(numberItem===1 ||retorno)setResults(new Array(NUMBER_STIMULI).fill(0))
        setState('results')
      }
      else{      
        if(retorno)setNumberItem(numberItem-1);
        else setNumberItem(numberItem+1);
      }
      
    }
  }

  function verifyAnswer(key){

    parseInt(answers[numberItem-1])===key ?  changeStimuli(1) : changeStimuli(0)

  }

  //Esta función establece el primer estimulo a ser mostrado
  function imagenInit(item){
    
    if(item!==1){
      let arrayAux = results
      for (let i = 0; i < item-1; i++) {
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
    }

    firstItem=item
    setNumberItem(item)
    setState('ejemplo')
  }

  //Función que cambia el estado principal
  function next(){
    switch (state) {
      case 'ejemplo':
        setState('test')
        break;
      case 'results':
        setState('revision')
        setResultsAux(results)
        break;
      case 'instruccion':
        setState('seleccion')
        break;
      case 'revision':
        setState('results')
        break;
      default:
        break;
    }
  }

  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('M')){
      props.setResWechsler('M',total)
    }else{
      if(props.resWechsler['M'] !== total){
        props.setResWechsler('M',total)
      }
    }

    return total;
  }

  function nextExample(){
    switch(stateExample){
      case 'ejemplo1':
        setStateExample('ejemplo2') 
        break;
      case 'ejemplo2':
        setState('test')
        break;
      default:
        break;
    }

  }

  function content(){
    switch (state) {
      case 'instruccion':
        return (
        <div id= "inicio" >
        <h1>Matrices</h1>
        <b>Instrucciones generales:</b>
        <p>Se presentarán una matriz o una serie incompleta al paciente</p>
        <p>La tarea es escoger, entre cinco opciones, la que mejor complete la matriz o la serie</p>
        <br/>
        <b>Instrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <p>Para calificar se debe presionar en el teclado el número correspondiente a la respuesta dada por el paciente</p>
        <p><b>Ejemplo:</b>Si la respuesta del paciente es el número "3" presionar la tecla correspondiente al "3"</p>
        <p>El sistema calificará automaticamente la prueba</p>
        <br/>
        <Grid container justify="center">
          <WaisWiscReturnButton
            msj="Regresar a prueba"
            callback={()=>setState("seleccion")}
          ></WaisWiscReturnButton>          
        </Grid>
      </div>)
      
      case "seleccion":
        return(
         <div >
         <h1>Matrices</h1>
         <p>¿En qué estímulo desea iniciar la prueba? </p>
         <p>Pacientes con sospechas de discapacidad intelectual</p>
          <CustomButton
            msj="Estímulo 1"
            callback={()=>imagenInit(1)}
          ></CustomButton>
          <p>Pacientes de edad 16-89:</p>
          <CustomButton
            msj="Estímulo 4"
            callback={()=>imagenInit(4)}
          ></CustomButton>
          <br/>
          <Grid container justify="center">
            <Tooltip title="Regresar al menu de wais">
              <Button className={classes.buttonStyle} onClick={()=>props.setBody("WAIS-selection")}>
                <ArrowBackIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Instrucciones de la prueba">
              <Button className={classes.buttonStyle} onClick={()=>setState("instruccion")}>
                <HelpOutlineIcon />
              </Button>
            </Tooltip>
          </Grid>
       </div>
        )
      case "ejemplo":
        return(
          <div >
              <h1> Estimulo {state}</h1>
              <img 
              className={classes.img} 
              alt={"Estímulo "+state} 
              src={require("../../../assets/estimulos/matrices/"+stateExample+".jpg")} />
              
              <CustomButton 
              msj="Siguiente"
              callback={nextExample}
              ></CustomButton> 
          </div>
          )
       case "test":
         return(
         <div>
             <h1> Estimulo {numberItem}</h1>
             <img 
               className={classes.img}
               alt={"Estímulo "+numberItem}
               src={require("../../../assets/estimulos/matrices/"+numberItem+".jpg")} />
               <KeyboardEventHandler 
               handleKeys={['1','2','3','4','5']} 
               onKeyEvent={(key, e) => {
                 verifyAnswer(parseInt(key))
                 }} />
         </div>
         )
       case "revision":
         return(
         <div>
           <h1>Matrices</h1>
           <h3>El puntaje por cada Item fue: </h3>
           <div className={classes.fields}>
             {results.map((result,index)=>
               <div key={index} className={classes.field}>
                 <TextField
                   className={classes.textfield}
                   id="filled-number"
                   label={"Item "+(index+1)}
                   type="number"
                   defaultValue={result}
                   inputProps={{min:0, max:1}}
                   variant="outlined"
                   onChange={(x)=>
                    setResultsAux(update(resultsAux,{
                       [index]: {
                         $set: parseInt(x.target.value)
                       }}))}
                 />
               </div>
               )}
             </div>
             
 
             <div id='buttons'>
                 <CustomButton              
                 msj="Regresar"
                 callback={()=>setState("results")}
                 ></CustomButton> 
                 <CustomButton             
                 msj="Actualizar Datos"
                 callback={()=>{
                  setResults(resultsAux) 
                  setState("results")
                  }}
                 ></CustomButton> 
             </div>
         </div>
         )
       case "results":
             return(
            <Results
            name="Matrices"
            result={getResult()}
            callback={next}
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

export default connect(mapStateToProps, mapDispatchToProps)(Matrices);
