import React, { useState,useEffect } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const LIMIT_ERROR = 3

const TIME_LIMIT = [30000,45000,45000,45000,45000,75000,75000,75000,75000,75000,120000,120000,120000,120000]

const NUMBER_STIMULI = 14

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

let firstItem;

let timer;

function Cubos() {

  const [state,setState]=useState("instruccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [timeBool,setTimeBool] = useState(false)

  const classes = useStyles();

  //Esta función cambia el estimulo actual y cambia los resultados
  function changeStimuli(key){

    clearTimeout(timer)    
    setTimeBool(false)
    if(state==='test'){
      
      if(retorno){
        
        if(0!==key){
          countRe++;
          setResults(update(results,{
            [numberItem-1]: {
              $set: key
            }}))

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
              $set: key
            }}))
          
        }        
      }
      else{
        if(0!==key){

          setResults(update(results,{
            [numberItem-1]: {
              $set: key
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

  //Esta función establece el primer estimulo a ser mostrado
  function imagenInit(item){
    
    if(item!==1){
      let arrayAux = results
      for (let i = 0; i < item-1; i++) {
        arrayAux[i]=2
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
    }

    firstItem=item
    setNumberItem(item)
    setState('test')
  }

  //Función que cambia el estado principal
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

  //ComponentWillUnmount
   useEffect(() => {
    clearTimeout(timer)
  }, []);

  //Timer: En caso de que la imagen pase por que se acabo el tiempo se dará una calificación de 0 al item
  function startTimer() {
    timer = setTimeout(() => {
      console.log("ENTROOO")
      setTimeBool(true)
    },TIME_LIMIT[numberItem-1])
  }

  function content(){
    switch (state) {
      case 'instruccion':
        return (
        <div id= "inicio" >
        <h1>Cubos</h1>
        <b>Intrucciones generales:</b>
        <p>A continuacion se enseñaran una serie de imagenes las cuales deberán ser reproducidas por el paciente</p> 
        <p>disponiendo de un tiempo limite para hacerlo</p>
  
        <br/>
        <b>Intrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <br/>
        <p>Para calificar se debe presionar las teclas numericas deacuerdo a la respuesta del paciente de la siguiente manera </p>
        <p>Del item 1 al 3</p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>1 : En caso de que realize la construcción correcta en el segundo intento</li>
        <li>2 : En caso de que realize la construcción correcta en el primer intento dentro del tiempo establecido</li>
        <p>Del item 4 al 8</p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>4 : En caso de que realize la construcción correcta dentro del tiempo establecido</li>
        <p>Del item 9 al 14</p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>4 : En caso de que realize la construcción correcta con poco tiempo de sobra dentro del tiempo establecido</li>
        <li>5 : En caso de que realize la construcción correcta con algun tiempo de sobra dentro del tiempo establecido</li>
        <li>6 : En caso de que realize la construcción correcta con algun tiempo de sobra dentro del tiempo establecido</li>
        <li>7 : En caso de que realize la construcción correcta con mucho tiempo de sobra del tiempo establecido</li>
        <br/>
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
         <p>Pacientes de edad 6-7 o con sospechas de discapacidad intelectual:</p>
         <CustomButton msj="Estimulo 1"
         callback={()=>imagenInit(1)}></CustomButton> 
         <p>Pacientes de edad 8-16</p>
         <CustomButton msj="Estimulo 3"
         callback={()=>imagenInit(3)}></CustomButton> 
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
               src={require("../../../assets/estimulos/cubos-wisc/"+numberItem+".jpg")} />
               <KeyboardEventHandler 
               handleKeys={ numberItem<=3 ? ['0','1','2'] : numberItem>8 ? ['0','4','5','6','7'] : ['0','4'] 

              } 
               onKeyEvent={(key, e) => {
                 clearTimeout(timer)
                 console.log("Presionaste la tecla " + key)
                 changeStimuli(parseInt(key))
                 }} />
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
                   inputProps={ index<3 ? {min:0, max:2} : index>7 ? {min:0, max:7} : {min:0, max:4}
                  }
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
            name="Cubos"
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

export default Cubos;
