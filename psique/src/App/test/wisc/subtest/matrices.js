import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 35

let answers = [5,1,2,2,3,4,4,1,4,3,2,5,1,4,2,1,4,5,4,3,2,3,3,4,2,1,1,3,2,2,5,4,3,1,5];

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
  }
}));

let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 
let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba

function Matrices() {

  const [state,setState]=useState("instruccion")
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
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
            terminacion=0
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
    return total;
  }

  function nextExample(){
    switch(stateExample){
      case 'ejemplo1':
        setStateExample('ejemplo2') 
        break;
      case 'ejemplo2':
        setStateExample('ejemplo3')
        break;
      case 'ejemplo3':
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
        <b>Intrucciones generales:</b>
        <p>Se presentarán una matriz o una serie incompleta al paciente</p>
        <p>La tarea es escoger, entre cinco opciones, la que mejor complete la matriz o la serie</p>
        <br/>
        <b>Intrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <br/>
        <p>Para calificar se debe presionar en el teclado el número correspondiente a la respuesta dada por el paciente </p>
        <p>El sistema calificara automaticamente la prueba</p>
        <br/>
        <CustomButton
          msj="Iniciar subprueba"
          callback={next}
        ></CustomButton>  
      </div>)
      
      case "seleccion":
        return(
         <div >
         <h1>Matrices</h1>
         <p>En que estimulo desea iniciar la prueba? </p>
         <p>Pacientes de edad 6-8 o con sospechas de discapacidad intelectual:</p>
         <CustomButton msj="Estimulo 4"
         callback={()=>imagenInit(4)}></CustomButton> 
         <p>Pacientes de edad 9-11</p>
         <CustomButton msj="Estimulo 7"
         callback={()=>imagenInit(7)}></CustomButton> 
         <p>Pacientes de edad 12-16</p>
         <CustomButton msj="Estimulo 11"
         callback={()=>imagenInit(11)}></CustomButton> 
       </div>
        )
      case "ejemplo":
        return(
          <div >
              <h1> Estimulo {state}</h1>
              <img 
              className={classes.img} 
              alt={"Estimulo "+state} 
              src={require("../../../assets/estimulos/matrices-wisc/"+stateExample+".jpg")} />
              
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
               alt={"Estimulo "+numberItem}
               src={require("../../../assets/estimulos/matrices-wisc/"+numberItem+".jpg")} />
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
            url="WISC-selection"
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

export default Matrices;
