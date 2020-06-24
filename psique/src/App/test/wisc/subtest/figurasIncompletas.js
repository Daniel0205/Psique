import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import KeyboardEventHandler from 'react-keyboard-event-handler';


const LIMIT_ERROR = 6

const TIME_LIMIT = 10000

const NUMBER_STIMULI = 38

const useStyles = makeStyles((theme) => ({
  img:{
      width:"60%"
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

let firstItem;

let timer;

function FigurasIncompletas() {
  const [state,setState]=useState("instruccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [timeBool,setTimeBool] = useState(false)

  const classes = useStyles();

  function changeStimuli(key){
    
    clearInterval(timer)
    setTimeBool(false)
    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
            setNumberItem(flagRe)
            return 
          }
        }
        else {
          
          countRe=0
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
            return                        
          }
          else terminacion++;

          if(terminacion===LIMIT_ERROR)setState('results');
        }
        
      }

      if(numberItem===NUMBER_STIMULI || numberItem===1){
        if(numberItem===1)setResults(new Array(NUMBER_STIMULI).fill(0))
        setState('results')
      }
      else{      
        if(retorno)setNumberItem(numberItem-1);
        else setNumberItem(numberItem+1);
      }
      startTimer()
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


  function next(){
    switch (state) {
      case 'ejemplo':
        setState('test')
        startTimer()
        break;
      case 'results':
        setState('revision')
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


  //Timer: En caso de que la imagen pase por que se acabo el tiempo se dará una calificación de 0 al item
  function startTimer() {
    
    timer = setInterval(() => {
      setTimeBool(true)
    },TIME_LIMIT)
  }


 function content(){
   switch (state) {
     case 'instruccion':
       return (
       <div id= "inicio" >
       <h1>Figuras incompletas</h1>
       <b>Intrucciones generales:</b>
       <p>A continuacion se enseñaran unas imagenes las cuales les hace falta algo</p>
       <p>el sujeto debe senalar o decir la parte faltante de la imagen</p>
 
       <br/>
       <b>Intrucciones para registrar la respuesta de paciente:</b>
       <br/>
       <br/>
       <li>0 : para indicar la respuesta no fue correcta o no contesto</li>
       <li>1 : para indicar la respuesta fue correcta</li>
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
        <h1>Figuras incompletas</h1>
        <p>En que estimulo desea iniciar la prueba? </p>
        <p>Pacientes de edad 6-8 o con sospechas de discapacidad intelectual:</p>
        <CustomButton msj="Estimulo 1"
        callback={()=>imagenInit(1)}></CustomButton> 
        <p>Pacientes de edad 9-11</p>
        <CustomButton msj="Estimulo 5"
        callback={()=>imagenInit(5)}></CustomButton> 
        <p>Pacientes de edad 12-16</p>
        <CustomButton msj="Estimulo 10"
        callback={()=>imagenInit(10)}></CustomButton> 
      </div>
       )
    case "ejemplo":
      return(
        <div >
            <h1> Estimulo {state}</h1>
            <img 
            className={classes.img} 
            alt={"Estimulo "+state} 
            src={require("../../../assets/estimulos/figurasIncompletas-wisc/"+state+".jpg")} />
            
            <CustomButton 
            msj="Iniciar"
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
              src={require("../../../assets/estimulos/figurasIncompletas-wisc/"+numberItem+".jpg")} />
              <KeyboardEventHandler 
              handleKeys={['1','0']} 
              onKeyEvent={(key, e) => changeStimuli(parseInt(key))} />
        </div>
        )
      case "revision":
        return(
        <div>
          <h1>Figuras incompletas</h1>
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
                    setResults(update(results,{
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
                callback={next}
                ></CustomButton> 
                <CustomButton             
                msj="Actualizar Datos"
                callback={()=>setState("results")}
                ></CustomButton> 
            </div>
        </div>
        )
      case "results":
            return(
           <Results
           name="Figuras Incompletas"
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

export default FigurasIncompletas;
