import React, { useState,useEffect } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';


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
  }
}));

function Balanzas() {
  const [state,setState]=useState("instruccion")
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
        <b>Intrucciones generales:</b>
        <p>A continuacion se enseñaran unas balanzas con dos platillos</p>
        <p>el sujeto debe seleccionar entre cinco opciones</p>
        <p>el objeto con el cual equilibrar la balanza</p>
        <br/>
        <b>Intrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <br/>
        <li>Utilizar los botones para indicar la respuesta del paciente </li>

        <p>El sistema calificara automaticamente la respuesta</p>

       <br/>
       <CustomButton
         msj="Iniciar subprueba"
         callback={next}
       ></CustomButton>  
     </div>)
     
     case "seleccion":
       return(
        <div >
        <h1>Balanzas</h1>
        <p>En que estimulo desea iniciar la prueba? </p>
        <p>Pacientes con sospechas de discapacidad intelectual:</p>
        <CustomButton msj="Estimulo 1"
        callback={()=>imagenInit(1)}></CustomButton> 
        <p>Pacientes de edad 16-69:</p>
        <CustomButton msj="Estimulo 4"
        callback={()=>imagenInit(4)}></CustomButton> 
        <p><b>No aplicar a paciente de edad  70-89</b></p>
      </div>
       )
    case "ejemplo":
    case "ejemplo a":
    case "ejemplo b":
      return(
        <div >
            <h1> Estimulo {state}</h1>
            <img 
            className={classes.img} 
            alt={"Estimulo "+state} 
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
            <h1> Estimulo {numberItem}</h1>
            {timeBool ? <h2><u><i>¡TIEMPO TERMINADO!</i></u></h2> : ""}
            <img 
              className={classes.img}
              alt={"Estimulo "+numberItem}
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

export default Balanzas;
