import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 30


const stimuli =  [['A','3'],['B','1'],['2','C'],
                  ['C','4'],['5','E'],['D','3'],
                  ['B','1','2'],['1','3','C'],['2','A','3'],
                  ['D','2','9'],['R','5','B'],['H','9','K'],
                  ['3','E','2'],['9','J','4'],['B','5','F'],
                  ['1','C','3','J'],['5','A','2','B'],['D','8','M','1'],
                  ['1','B','3','G','7'],['9','V','1','T','7'],['P','3','J','1','M'],
                  ['1','D','4','E','9','G'],['H','3','B','4','F','8'],['7','Q','6','M','3','Z'],
                  ['S','3','K','4','Y','1','G'],['7','S','9','K','1','T','6'],['L','2','J','6','Q','3','G'],
                  ['4','B','8','R','1','M','7','H'],['J','2','U','8','A','5','C','4'],['6','L','1','Z','5','H','2','W']]

const answersExample = [[0,0],[0,0]]

const rightExample = [["2","A"],["3","B"]]

const rightAnswers = [['A','3'],['B','1'],['C','2'],
                      ['C','4'],['E','5'],['D','3'],
                      ['B','1','2'],['C','1','3'],['A','2','3'],
                      ['D','2','9'],['B','R','5'],['H','K','9'],
                      ['E','2','3'],['J','4','9'],['B','F','5'],
                      ['C','J','1','3'],['A','B','2','5'],['D','M','1','8'],
                      ['B','G','1','3','7'],['T','V','1','7','9'],['J','M','P','1','3'],
                      ['D','E','G','1','4','9'],['B','F','H','3','4','8'],['M','Q','Z','3','6','7'],
                      ['G','K','S','Y','1','3','4'],['K','S','T','1','6','7','9'],['G','J','L','Q','2','3','6'],
                      ['B','H','M','R','1','4','7','8'],['A','C','J','U','2','4','5','8'],['H','L','W','Z','1','2','5','6']]

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

function LetrasNumeros(props) {
  const [state,setState]=useState("instruccion")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [scored,setScored] = useState(undefined)
  const [answers,setAnswers] =  useState(["0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0",
                                        "0","0","0","0","0"])


  const classes = useStyles();


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

    if(!props.resWechsler.hasOwnProperty('NL')){
      props.setResWechsler('NL',total)
    }else{
      if(props.resWechsler['NL'] !== total){
        props.setResWechsler('NL',total)
      }
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

  function scoreExample(){
    let result
      
    if(state==="ejemplo A"){
      if(answersExample[0].join(',')=== rightExample[0].join(',')){
        result = true
      }
      else result = false
    }
    else {
      if(answersExample[1].join(',')=== rightExample[1].join(',')){
        result =  true
      }
      else result =  false

    }
    setScored(result)
   
  }

 function content(){
  
  
   switch (state) {
     case 'instruccion':
       return (
       <div>
        <h1>Letras y Numeros</h1>
        <b>instrucciones generales:</b>
        <p>A continuacion se enseñaran una serie de numeros y letras</p>
        <p>el doctor debera decirle al paciente cada serie</p>
        <p>despues de esto el paciente debera repetir en orden la serie</p>
        <p>en el orden no importa si son primero las letras o los numeros</p>
        <br/>
        <b>instrucciones de calificación:</b>
        <p>Para calificar se debe ingresar las Respuestas del paciente en los recuadros bajo el estimulo </p>
        <p>EL sistema calificara automaticamente las respuestas </p>
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
          <h1>Letras y Numeros</h1>
          <h3>El puntaje por cada Item fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              [<h3 key={index+1}>Item {index+1}</h3>,
              <div key={index} className={classes.field}>  
                <TextField
                  className={classes.textfield}
                  label={"Calificación"}
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
           name="Letras y Numeros"
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
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LetrasNumeros);