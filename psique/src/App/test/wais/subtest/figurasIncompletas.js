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

const LIMIT_ERROR = 4

const TIME_LIMIT = 20000

const NUMBER_STIMULI = 24

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

function FigurasIncompletas(props) {
  const [state,setState]=useState("seleccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [timeBool,setTimeBool] = useState(false)

  const classes = useStyles();

  function changeStimuli(key){

    clearTimeout(timer)    
    setTimeBool(false)
    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          terminacion=0
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
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

    if(!props.resWechsler.hasOwnProperty('FI')){
      props.setResWechsler('FI',total)
    }else{
      if(props.resWechsler['FI'] !== total){
        props.setResWechsler('FI',total)
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
       <h1>Figuras incompletas</h1>
       <b>Instrucciones generales:</b>
       <p>A continuación se enseñan unas imágenes las cuales les hace falta algo</p>
       <p>El paciente debe señalar o decir la parte faltante de la imagen</p>
 
       <br/>
       <b>Instrucciones para registrar la respuesta de paciente:</b>
       <br/>
       <li>0 : para indicar la respuesta no fue correcta o no contestó</li>
       <li>1 : para indicar la respuesta fue correcta</li>
       <p>El sistema calificará automáticamente la prueba</p>
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
        <h1>Figuras incompletas</h1>
        <p>¿En qué estímulo desea iniciar la prueba? </p>
        <p>Pacientes con sospechas de discapacidad intelectual:</p>
        <CustomButton msj="Estímulo 1"
          callback={()=>imagenInit(1)}></CustomButton> 
        <p>Pacientes de edad 16-89</p>
        <CustomButton msj="Estímulo 4"
          callback={()=>imagenInit(4)}></CustomButton>
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
            <h1> Estímulo {state}</h1>
            <img 
            className={classes.img} 
            alt={"Estímulo "+state} 
            src={require("../../../assets/estimulos/figurasIncompletas/"+state+".png")} />
            
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
              alt={"Estímulo "+numberItem}
              src={require("../../../assets/estimulos/figurasIncompletas/"+numberItem+".png")} />
              <KeyboardEventHandler 
              handleKeys={['1','0']} 
              onKeyEvent={(key, e) => {
                clearTimeout(timer)
                changeStimuli(parseInt(key))
                }} />
        </div>
        )
      case "revision":
        return(
        <div>
          <h1>Figuras incompletas</h1>
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
           name="Figuras Incompletas"
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

export default connect(mapStateToProps, mapDispatchToProps)(FigurasIncompletas);
