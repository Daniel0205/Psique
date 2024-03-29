import React, { useState,useEffect } from 'react';
import CustomButton from '../../../components/customButton';
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
import Results from '../../../components/results';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
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

let TIME_LIMIT = 20000

const NUMBER_STIMULI = 27

const rightAnswers = [5,1,2,3,4,1,4,
                     4,5,1,2,5,3,1,
                     4,1,3,3,2,2,2,
                     5,3,5,1,2,4]


let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 


let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente

let firstItem;

let timer;


const useStyles = makeStyles((theme) => ({
  img:{
      width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"70%"
  },
  field:{
    paddingTop:"6%",
    display:"inline-flex"
  },
  textfield:{
    width:"100%"
  },
  ordenar:{
    display:"inline-flex"
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

function Balanzas(props) {
  const [state,setState]=useState("seleccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [answers ,setAnswers] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [timeBool,setTimeBool] = useState(false)
  const [scored,setScored] = useState(undefined)

  const classes = useStyles();

  function changeStimuli(key){

    clearTimeout(timer)    
    setTimeBool(false)
    if(numberItem===12)TIME_LIMIT=40000
    
    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          terminacion=0
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
            terminacion=0
            setNumberItem(flagRe)
            startTimer()
            return 
          }
        }
        else {

          clearTimeout(timer)
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
            startTimer()
            terminacion++;
            return                        
          }
          else terminacion++;
        }
        
      }

      if(numberItem===NUMBER_STIMULI ||  (numberItem===1 && retornoHecho)|| terminacion===LIMIT_ERROR){
        if(numberItem===1 ||retorno)setResults(new Array(NUMBER_STIMULI).fill(0))
        setState('results')
      }
      else{      
        if(retorno)setNumberItem(numberItem-1);
        else setNumberItem(numberItem+1);
      }
      
    }
  }

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

  function score(answer){

    setAnswers(update(answers,{
      [numberItem-1]: {
        $set: answer
      }}))

    if(answer===rightAnswers[numberItem-1])changeStimuli(1)
    else changeStimuli(0)

  }


  function scoreExample(answer){

    if(state==="ejemplo a"){
      if(answer===3)setScored(true)
      else setScored(false)
    }
    else{
      if(answer===1)setScored(true)
      else setScored(false)
    }

  }

  function next(){
    switch (state) {
      case 'ejemplo':
        setState('ejemplo a')
        break;
      case 'ejemplo a':
        setState('ejemplo b')
        setScored(undefined)
        break;
      case 'ejemplo b':
        setState('test')
        startTimer()
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

    if(!props.resWechsler.hasOwnProperty('B')){
      props.setResWechsler('B',total)
    }else{
      if(props.resWechsler['B'] !== total){
        props.setResWechsler('B',total)
      }
    }

    return total;
  }

  //COmponentWillUnmount
  useEffect(() => {
    clearTimeout(timer)
  }, []);

  //Timer: En caso de que la imagen pase por que se acabo el tiempo se dará una calificación de 0 al item
  function startTimer() {
    timer = setTimeout(() => {

      setTimeBool(true)
    },TIME_LIMIT)
  }


 function content(){
   switch (state) {
     case 'instruccion':
       return (
       <div id= "inicio" >
        <h1>Balanzas</h1>
        <b>Instrucciones generales:</b>
        <p>A continuación se enseñan una serie de balanzas</p>
        <p>El sujeto debe seleccionar entre cinco opciones el objeto con el cual se equilibra la balanza</p>
        <p><b>La interfaz debe ser mostrada al paciente para observar el estímulo</b></p>
        <br/>
        <b>Instrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <p>Utilizar los botones para indicar la respuesta del paciente </p>
        <p>El sistema calificará automáticamente la respuesta</p>

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
        <h1>Balanzas</h1>
        <p>¿En qué estímulo desea iniciar la prueba? </p>
        <p>Pacientes con sospechas de discapacidad intelectual:</p>
        <CustomButton msj="Estímulo 1"
          callback={()=>imagenInit(1)}></CustomButton> 
        <p>Pacientes de edad 16-69:</p>
        <CustomButton msj="Estímulo 4"
          callback={()=>imagenInit(4)}></CustomButton> 
        <p><b>No aplicar a pacientes de edad 70-89</b></p>
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

        <Grid container justify="center">
          <p><b>Recuerde que barra superior de la aplicación se puede ocultar durante la aplicación de la prueba</b></p>
        </Grid>
        <Grid container justify="center">
          <p><b>Utilize el botón en la parte izquierda de la barra para ocultarla</b></p>
        </Grid>
      </div>
       )
    case "ejemplo":
    case "ejemplo a":
    case "ejemplo b":
      return(
        <div >
            <h1> Estímulo {state}</h1>
            <img 
            className={classes.img} 
            alt={"Estímulo "+state} 
            src={require("../../../assets/estimulos/balanzas/"+state+".png")} />
            
            {state!=="ejemplo" ?
            scored===undefined ? 
            <div>
              <p>Respuesta:</p>
              <div className={classes.ordenar}>
                {[1,2,3,4,5].map((value)=>
                <CustomButton
                  key={value}
                  msj={"Opcion "+value}
                  callback={()=>scoreExample(value)}
                ></CustomButton>)}
                
              </div>
            </div>
            : scored ? <h2><u><i>¡CORRECTO!</i></u></h2>:<h2><u><i>¡INCORRECTO! </i></u></h2>:"" }

            <CustomButton 
            msj={state!=="ejemplo b"?"Siguiente":"Iniciar"}
            callback={next}
            ></CustomButton> 
        </div>
      )
      case "test":
        return(
        <div>
            <h1> Estímulo {numberItem}</h1>
            {timeBool ? <h2><u><i>¡TIEMPO TERMINADO!</i></u></h2> : ""}
            <img 
              className={classes.img}
              alt={"Estímulo "+numberItem}
              src={require("../../../assets/estimulos/balanzas/"+numberItem+".png")} />
              <p>Respuesta:</p>
              
              <div className={classes.ordenar}>
                {[1,2,3,4,5].map((value)=>
                <CustomButton
                  key={value}
                  msj={"Opcion "+value}
                  callback={()=>score(value)}
                ></CustomButton>)}
                
              </div>
        </div>
        )
      case "revision":
        return(
        <div>
          <h1>Balanzas</h1>
          <h3>El puntaje por cada ítem fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              <div key={index} className={classes.field}>
                <TextField
                  className={classes.textfield}
                  id="filled-number"
                  label={"Item "+(index+1)}
                  type="number"
                  defaultValue={result}
                  inputProps={{
                    min:0,
                    max:1,
                  }}
                  variant="outlined"
                  onChange={(x)=>
                    setResultsAux(update(resultsAux,{
                      [index]: {
                        $set: parseInt(x.target.value)
                      }}))}
                />
                &nbsp;  &nbsp;
                 <TextField
                  className={classes.textfield}
                  label="Respuesta-paciente"
                  defaultValue={answers[index]}
                  inputProps={{
                    min:0,
                    max:1,
                  }}
                  variant="outlined"
                  disabled
                />
                &nbsp;  &nbsp;
                <TextField
                  className={classes.textfield}
                  label="Respuesta correcta"
                  defaultValue={rightAnswers[index]}
                  inputProps={{
                    min:0,
                    max:1,
                  }}
                  variant="outlined"
                  disabled
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
           name="Balanzas"
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

export default connect(mapStateToProps, mapDispatchToProps)(Balanzas);