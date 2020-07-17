import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 28

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

let returnDone = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let returnVar = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 
let badAnswerCount= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba
let example = false; //Indica si esta en el ejemplo

let stimuliSrc = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14",
                  "15","16","17","18","19","20","21","22","23","24","25","26","27","28"];

function PuzlesVisuales() {
  var [state,setState]=useState("instruccion");
  var [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  var [numberItem,setNumberItem] = useState(0);

  const classes = useStyles();

  function changeStimuli(punt){
    var returnController = firstItem!==2 && returnVar && numberItem===2 && countRe!==2; // Verifica que al hacer el retorno y llegar al estimulo 0 no siga avanzando en la prueba
    if((badAnswerCount < LIMIT_ERROR && numberItem < NUMBER_STIMULI) && !returnController){ // Verifica que no se haya cumplido la condicion de termino
      var nextNumber = numberItem;

      //Este verificacion me dice si se cumple la condición para retornar y asi devolverse en caso de ser necesario
      if((((numberItem === 6 || numberItem === 7) && firstItem === 6))
          && punt === 0 && !returnDone){
        returnVar = true;
        flagRe = numberItem;
        nextNumber = firstItem;
        returnDone = true;
      }

      if(!returnVar){ //En caso de no haber fallado los items 6 0 7 sigue aumentado a partir de ahí
        nextNumber += 1;
        

      }else{ //En caso de que halla fallado los primeros reactivos vuelve al reactivo anterior y empieza a disminuir desde ahí        
        if(countRe===2){
          returnVar = false;
          nextNumber = flagRe + 1;
          
        }else{
          nextNumber -= 1;
        }        
      }

      setNumberItem(nextNumber);
      if(nextNumber>= NUMBER_STIMULI){
        setState('revision');
      }
    }else{
      setState('revision');
    }
  }

  function score(key){
    var punt = parseInt(key);
    if(punt !== 0){
      if(returnVar){        
        countRe +=1;
      }

      if(badAnswerCount > 0){        
        badAnswerCount = 0;
      }
      
      setResults(update(results,{
        [numberItem]: {
          $set: punt
        }}))
      
      changeStimuli(punt);
      
    }else{
      setResults(update(results,{
        [numberItem]: {
          $set: punt
        }}))

      badAnswerCount += 1;

      if(countRe>0){
        countRe=0;
      }
      changeStimuli(punt);
    }    
  }

  //Esta función establece el primer estimulo a ser mostrado
  function imagenInit(item){    
    if(item!==2){
      let arrayAux = results
      for (let i = 2; i < item-1; i++) {
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }

    firstItem=item
    setNumberItem(0)
    setState('ejemplo-demostracion')
  }

  //Función que cambia el estado principal
  function next(){
    switch (state) {
      case 'ejemplo-demostracion':
        setState('test');
        setNumberItem(firstItem);
        break;
      case 'results':
        setState('revision');
        break;
      case 'instruccion':
        setState('seleccion');
        break;
      case 'revision':
        setState('results');
        break;
      default:
        break;
    }
  }

  function getResult() {
    var total = 0;
    for(var i=2;i<results.length;i++){
      total = total + results[i];
    }
    return total;
  }

  function nextDemoExample(key){
    var punt = parseInt(key);
    setResults(update(results,{
      [numberItem]: {
        $set: punt
    }}))

    if(!example){
      example = true;
      setNumberItem(numberItem+1);      

    }else{
      next();
    }
  }

  function content(){
    switch (state) {
      case 'instruccion':
        return (
          <div id= "inicio" >
            <h1>Pluzles Visuales</h1>
            <b>Intrucciones generales:</b>
            <p>Se presentará una imagen principal en la parte superior y seis imágenes más debajo de esta.</p>
            <p>La tarea es escoger, entre las seis opciones, las tres figuras que combinadas forman la figura principal </p>
            <br/>
            <b>Intrucciones de calificacion:</b>
            <p>Para calificar se debe presionar '1' para indicar una respuesta correcta por el paciente o '0' en caso de que sea incorrecta  </p>
            <br/>
            <CustomButton
              msj="Iniciar subprueba"
              callback={next}
            ></CustomButton>  
          </div>
        )
      
      case "seleccion":
        return(
         <div>
            <h1>Pluzles Visuales</h1>
            <p>¿En que estimulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Estimulo 1"
              callback={()=>imagenInit(2)}
            ></CustomButton>

            <p>Pacientes de edad 16-89:</p>
            <CustomButton
              msj="Estimulo 5"
              callback={()=>imagenInit(6)}
            ></CustomButton> 
          </div>
        )

      case "ejemplo-demostracion":
        return(
          <div >
            <h1> Estimulo {example ? "Ejemplo": "Demostración"}</h1>
            <img 
              className={classes.img} 
              alt={"Estimulo "+state+numberItem} 
              src={require("../../../assets/estimulos/PuzlesVisuales/"+stimuliSrc[numberItem]+".jpg")}
            />
            
            <KeyboardEventHandler 
              handleKeys={['1','0']}
              onKeyEvent={(key, e) => {
                nextDemoExample(parseInt(key))
                }}
            />
          </div>
        )

       case "test":
         return(
          <div>
            <h1> Estimulo {numberItem-1}</h1>
            <img 
              className={classes.img}
              alt={"Estimulo "+(numberItem-1)}
              src={require("../../../assets/estimulos/PuzlesVisuales/"+stimuliSrc[numberItem]+".jpg")}
            />

            <KeyboardEventHandler 
              handleKeys={['1','0']}
              onKeyEvent={(key, e) => {
                score(parseInt(key))
              }}
            />
          </div>
         )

       case "revision":
         return(
         <div>
            <h1>Pluzles Visuales</h1>
            <h3>El puntaje por cada Item fue: </h3>
            <div className={classes.fields}>
              {results.map((result,index)=>
                <div key={index} className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    id="filled-number"
                    label={index===0 ? "Item Demostración" : index===1 ? "Item Ejemplo" : "Item "+(index-1)}
                    type="number"
                    defaultValue={result}
                    inputProps={{min:0, max:1}}
                    variant="outlined"
                    helperText={index<2 ? "No se cuenta en la puntuación" : ""}
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
                callback={()=>setState("results")}
              ></CustomButton> 
            </div>
         </div>
        )

       case "results":
        return(
          <Results
            name="Pluzles Visuales"
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

export default PuzlesVisuales;
