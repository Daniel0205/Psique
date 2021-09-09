import React, { useState,useEffect } from 'react';
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

const LIMIT_ERROR = 2

const TIME_LIMIT = [30000,30000,30000,30000,60000,60000,60000,60000,60000,60000,120000,120000,120000,120000]

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

let firstItem;

let timer;

function Cubos(props) {
  const [state,setState]=useState("seleccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [timeBool,setTimeBool] = useState(false)

  const classes = useStyles();

  //Esta función cambia el estímulo actual y cambia los resultados
  function changeStimuli(key){

    clearTimeout(timer) 
    let  timeReturn= timeBool; 
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
        if(0!==key && !timeReturn){

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

  //Esta función establece el primer estímulo a ser mostrado
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
    setState('ejemplo')
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

    if(!props.resWechsler.hasOwnProperty('C')){
      props.setResWechsler('C',total)
    }else{
      if(props.resWechsler['C'] !== total){
        props.setResWechsler('C',total)
      }
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
      setTimeBool(true)
    },TIME_LIMIT[numberItem-1])
  }

  function content(){
    switch (state) {
      case 'instruccion':
        return (
        <div id= "inicio" >
        <h1>Cubos</h1>
        <b>Instrucciones generales:</b>
        <p>La prueba consiste en una serie de imagenes las cuales deberán ser reproducidas por el paciente</p> 
        <p>utilizando el material de apoyo, disponiendo de un tiempo limite</p>
        <p><b>Debe permitir que el paciente observe la inerfaz para reproducir dichas imágenes</b></p>
  
        <br/>
        <b>Instrucciones para registrar la respuesta de paciente:</b>
        <p>Para calificar se debe presionar las teclas numericas deacuerdo a la respuesta del paciente de la siguiente manera </p>
        <p><b>Del item 1 al 4</b></p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>1 : En caso de que realize la construcción correcta en el segundo intento</li>
        <li>2 : En caso de que realize la construcción correcta en el primer intento dentro del tiempo establecido</li>
        <p><b>Del item 5 al 8</b></p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>4 : En caso de que realize la construcción correcta dentro del tiempo establecido</li>
        <p><b>Del item 9 al 14</b></p>
        <li>0 : En caso de que no realize la construcción correcta o si excede el limite de tiempo</li>
        <li>4 : En caso de que realize la construcción correcta con poco tiempo de sobra dentro del tiempo establecido</li>
        <li>5 : En caso de que realize la construcción correcta con algun tiempo de sobra dentro del tiempo establecido</li>
        <li>6 : En caso de que realize la construcción correcta con algun tiempo de sobra dentro del tiempo establecido</li>
        <li>7 : En caso de que realize la construcción correcta con mucho tiempo de sobra del tiempo establecido</li>
        <br/>
        <Grid container justify="center">
          <WaisWiscReturnButton
            msj="Regresar a prueba"
            callback={()=>setState("seleccion")}
          ></WaisWiscReturnButton>          
        </Grid>
      </div>)
      case "ejemplo":
        return(
        <div >
          <h1> Ejemplo</h1>
          <img 
            className={classes.img}
            alt={"ejemplo "}
            src={require("../../../assets/estimulos/cubos/ejemplo.png")} 
          />
        
         <CustomButton msj="Siguiente"
         callback={next}></CustomButton> 
       </div>
        )
      case "seleccion":
        return(
          <div >
          <h1>Cubos</h1>
          <p>La prueba se inicia en el estímulo 5 para los pacientes entre los 16-89 años </p>
          <Grid container justify="center">
            <CustomButton 
              msj="Iniciar prueba"
              callback={()=>imagenInit(5)}>
            </CustomButton> 
          </Grid>

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
       case "test":
         return(
         <div>
             <h1> Estímulo {numberItem}</h1>
             {timeBool ? <h2><u><i>¡TIEMPO TERMINADO!</i></u></h2> : ""}
             <img 
               className={classes.img}
               alt={"Estímulo "+numberItem}
               src={require("../../../assets/estimulos/cubos/"+numberItem+".png")} />
               <KeyboardEventHandler 
               handleKeys={ numberItem<=4 ? ['0','1','2'] : numberItem>8 ? ['0','4','5','6','7'] : ['0','4'] 

              } 
               onKeyEvent={(key, e) => {
                 clearTimeout(timer)
                 changeStimuli(parseInt(key))
                 }} />
         </div>
         )
       case "revision":
         return(
         <div>
           <h1>Cubos</h1>
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
                   inputProps={ index<4 ? {min:0, max:2} : index>7 ? {min:0, max:7} : {min:0, max:4}
                  }
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
            name="Cubos"
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

const mapDispatchToProps = dispatch => {
  return {
    setBody: (item) => dispatch(setBody(item)),
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cubos);
