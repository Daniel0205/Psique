import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';


const LIMIT_ERROR = 3

const NUMBER_STIMULI = 30

let estimulosDD = [[2,9],[4,6],
                  [3,8,6],[6,1,2],
                  [3,4,1,7],[6,1,5,8],
                  [5,2,1,8,6],[8,4,2,3,9],
                  [3,8,9,1,7,4],[7,9,6,4,8,3],
                  [5,1,7,4,2,3,8],[9,8,5,2,1,6,3],
                  [1,8,4,5,9,7,6,3],[2,9,7,6,3,1,5,4],
                  [5,3,8,7,1,2,4,6,9],[4,2,6,9,1,7,8,3,5]];

let estimulosDI = [[2,1],[1,3],
                  [3,5],[6,4],
                  [2,5,9],[5,7,4],
                  [8,4,9,3],[7,2,9,6],
                  [4,1,3,5,7],[9,7,8,5,2],
                  [1,6,5,2,9,8],[3,6,7,1,9,4],
                  [8,5,9,2,3,4,6],[4,5,7,9,2,8,1],
                  [6,9,1,7,3,2,5,8],[8,1,7,9,5,4,8,2]];

let respuestasCorrectasDD =  ["2,9","4,6",
                              "3,8,6","6,1,2",
                              "3,4,1,7","6,1,5,8",
                              "5,2,1,8,6","8,4,2,3,9",
                              "3,8,9,1,7,4","7,9,6,4,8,3",
                              "5,1,7,4,2,3,8","9,8,5,2,1,6,3",
                              "1,8,4,5,9,7,6,3","2,9,7,6,3,1,5,4",
                              "5,3,8,7,1,2,4,6,9","4,2,6,9,1,7,8,3,5"];

let respuestasCorrectasDI =  ["1,2","3,1",
                              "5,3","4,6",
                              "9,5,2","4,7,5",
                              "3,9,4,8","6,9,2,7",
                              "7,5,3,1,4","2,5,8,7,9",
                              "8,9,2,5,6,1","4,9,1,7,6,3",
                              "6,4,3,2,9,5,8","1,8,2,9,7,5,4",
                              "8,5,2,3,7,1,9,6","2,8,4,5,9,7,1,8"];

let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente

const useStyles = makeStyles((theme) => ({
  img:{
      width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"70%"
  },
  group:{
    display: "flex",
  },
  field:{
    display:"inline-flex"
  },
  textfield:{
    width:"100%"
  }
}));
                             

function Digitos() {

  const classes = useStyles();
  const [state,setState]=useState("test")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [scored,setScored] = useState(undefined)

  function changeStimuli(key){

    if(state==='test'){
          
      if(1===key){
        
        setResults(update(results,{
          [numberItem-1]: {
            $set: 1
          }}))
        terminacion=0
      }
      else{
        if((numberItem-1)%3===0)terminacion=0
        terminacion++;

      }

      if(numberItem===NUMBER_STIMULI || terminacion===LIMIT_ERROR){
        setState('results')
      }
      else{      
        setNumberItem(numberItem+1);
      }
      
    }
  }

  function imagenInit(item){
    
    setNumberItem(item)
    setState('ejemplo A')
  }


  function next(){
    switch (state) {
      case 'ejemplo A':
        setState('ejemplo B')
        setScored(undefined)
        break;
      case 'ejemplo B':
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

  function score(index){
    let array1=answers[index].slice()
    let array2=rightAnswers[index].slice()
    let array3=rightAnswers[index].slice()

    if(array1.split("").join(',')=== array2.join(',') || array1.split("").join(',')=== array3.sort().join(',')){
      changeStimuli(1)
    }
    else  changeStimuli(0)

    
  }
  

  function content(){  
    switch (state) {
      case 'instruccion':
        return (
        <div>
         <h1>Dígitos</h1>
         <b>Intrucciones generales:</b>
         <p>Se realizarán dos puebas que consisten en las que el profesional dictara una lista de números </p>
         <p>y la tarea del paciente es repetir y repetir en orden inverso</p>
         <p>Los items se presentan de forma verbal</p>
         <br/>
         <b>Intrucciones de calificacion:</b>
         <p>Para calificar debe escribir los números que de el paciente en el espacio asignado y luego oprimir el botón "Siguiente"</p>
         <p>El sistema se encargará de asignar la puntuación correspondiente</p>
         <br/>
        <CustomButton
          msj="Iniciar subprueba"
          callback={()=>imagenInit(1)}
        ></CustomButton>  
      </div>)
     case "ejemplo A":
     case "ejemplo B":  
       return(
         <div >
             <h1> Estimulo {state}</h1>
             <br/>
             <br/>
             {state==="ejemplo A"?<h1>C-1</h1>:<h1>A-4</h1>}
             
             {scored===undefined ? 
             <div>
               <p>Respuesta:</p>
               <TextField
                 defaultValue="0"
                 
                 variant="outlined"
                 onChange={(x)=>{state==="ejemplo A"?answersExample[0][0]=x.target.value.slice(0,1).toUpperCase():
                 answersExample[1][0]=x.target.value.slice(0,1).toUpperCase()}}
               />
               &nbsp;  &nbsp;
               <TextField
                 defaultValue="0"
                 
                 variant="outlined"
                 onChange={(x)=>{state==="ejemplo A"?answersExample[0][1]=x.target.value.slice(0,1).toUpperCase()
                 :answersExample[1][1]=x.target.value.slice(0,1).toUpperCase()}}
               />
             </div>
             : scored ? <h2><u><i>¡CORRECTO!</i></u></h2>:<h2><u><i>¡INCORRECTO! </i></u></h2> }
             
             <CustomButton 
             msj={scored===undefined?"Calificar":"Iniciar"}
             callback={scored===undefined? scoreExample : next}
             ></CustomButton> 
         </div>
       )
       case "test":
         return(
         <div>
             
             <h1> Estimulo {Math.trunc((numberItem-1)/3)+1}- Intento # {(numberItem-1)%3+1}</h1>
             <br/>
             <br/>
             <h1>{stimuli[numberItem-1].join("-")}</h1>
             
             <p>Respuesta:</p>
             
             <div className={classes.field}>
               <TextField
                 value={answers[numberItem-1].split("").join("-")}
                 variant="outlined"
                 onChange={(x)=>{
                   setAnswers(update(answers,{
                     [numberItem-1]: {
                       $set: x.target.value.toUpperCase().split("-").join("").slice(0,stimuli[numberItem-1].length)
                     }}))
                 }}
               />
               
             </div>
             <CustomButton 
               msj="siguiente"
               callback={()=>score(numberItem-1)}
               ></CustomButton> 
         </div>
         )
       case "revision":
         return(
         <div>
           <h1>Dígitos</h1>
           <h3>El puntaje por cada Item fue: </h3>
           <div className={classes.fields}>
             {results.map((result,index)=>
               [<h3 key={index+1}>Item {index+1}</h3>,
               <div key={index} className={classes.field}>  
                 <TextField
                   className={classes.textfield}
                   label={"Calificacion"}
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
                   defaultValue={answers[index].split("").join("-")}
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
                   label="Respuesta correcta 1"
                   defaultValue={rightAnswers[index].join("-")}
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
                   label="Respuesta correcta 2"
                   defaultValue={rightAnswers[index].slice().sort().join("-")}
                   inputProps={{
                     min:0,
                     max:1,
                   }}
                   variant="outlined"
                   disabled
                 />
               </div>]
               )}
             </div>
             
 
             <div >
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
            name="Dígitos"
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

export default Digitos;
