import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
import Results from '../../../components/results'
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

const LIMIT_ERROR = 5

const NUMBER_STIMULI = 28

const rightExample = [[2,3,0],[1,3,0]]

const rightAnswers = [[1,4,0],[1,4,0],[2,4,0],[1,3,0],[3,5,0],[1,6,0],[2,6,0],
                      [2,3,0],[3,5,0],[2,4,0],[1,5,0],[3,4,0],[1,6,9],[3,5,7],
                      [2,6,8],[3,5,8],[2,6,7],[3,6,11],[2,4,9],[1,8,10],[3,4,7],
                      [2,7,9],[3,5,12],[2,8,10],[1,7,12],[1,6,7],[4,5,9],[2,8,10]]

const useStyles = makeStyles((theme) => ({
  img:{
      width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"50%"
  },
  group:{
    display: "flex",
  },
  field:{
    display:"flex"
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

const answers = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
                 [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
                 [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
                 [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
                 
const answersExample = [[0,0,0],[0,0,0]]

let firstItem;// Item en el que inicio la prueba

function ConceptoDibujos(props) {
  const [state,setState]=useState("seleccion")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [scored,setScored] = useState(undefined)
  const [fields,setFields] = useState([0,0,0])

  const classes = useStyles();


  function changeStimuli(key){

    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          terminacion=0
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
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


      if(numberItem===NUMBER_STIMULI ||  (numberItem===1 && retornoHecho) || terminacion===LIMIT_ERROR){
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

    if(!props.resWechsler.hasOwnProperty('CD')){
      props.setResWechsler('CD',total)
    }else{
      if(props.resWechsler['CD'] !== total){
        props.setResWechsler('CD',total)
      }
    }

    return total;
  }

  function score(index){
    let array1=answers[index].slice()
    let array2=rightAnswers[index].slice()

    if(array1.sort().join(',')=== array2.sort().join(',')){
      changeStimuli(1)
    }
    else  changeStimuli(0)

    setFields([0,0,0])
  }

  function scoreExample(){
    let result
      
    if(state==="ejemplo A"){
      if(answersExample[0].sort().join(',')=== rightExample[0].sort().join(',')){
        result = true
      }
      else result = false
    }
    else {
      if(answersExample[1].sort().join(',')=== rightExample[1].sort().join(',')){
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
       <h1>Conceptos con dibujos</h1>
        <b>Instrucciones generales:</b>
        <p>A continuación se presentarán dos o tres filas de dibujos</p>
        <p>el paciente debe señalar o decir las imágenes que tenga una característica en común</p>

        <br/>
        <b>Instrucciones para registrar la respuesta de paciente:</b>
        <br/>
        <p>La respuesta del paciente se registra en los campos bajo la imagen</p>
        <p>Indicando las opciones seleccionadas por el paciente</p>
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
        <h1>Conceptos con dibujos</h1>
        <p>¿En qué estímulo desea iniciar la prueba? </p>
        <p>Pacientes de edad 6-8 o con sospechas de discapacidad intelectual:</p>
        <CustomButton msj="Estímulo 1"
          callback={()=>imagenInit(1)}></CustomButton> 
        <p>Pacientes de edad 9-11</p>
        <CustomButton msj="Estímulo 5"
          callback={()=>imagenInit(5)}></CustomButton> 
        <p>Pacientes de edad 12-16</p>
        <CustomButton msj="Estímulo 7"
          callback={()=>imagenInit(7)}></CustomButton>
        <br/>
        <Grid container justify="center">
          <Tooltip title="Regresar al menu de wisc">
            <Button className={classes.buttonStyle} onClick={()=>props.setBody("WISC-selection")}>
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
    case "ejemplo A":
    case "ejemplo B":
      return(
        <div >
            <h1> Estímulo {state}</h1>
            <img 
            className={classes.img} 
            alt={"Estimulo "+state} 
            src={require("../../../assets/estimulos/conceptosDibujos-wisc/"+state+".jpg")}/>
            {scored===undefined ? 
            <div>
              <p>Respuestas:</p>
              <TextField
                defaultValue="0"
                type="number"
                inputProps={{
                  min:0,
                  max:12
                }}
                variant="outlined"
                onChange={(x)=>{state==="ejemplo A"?answersExample[0][0]=parseInt(x.target.value):answersExample[1][0]=parseInt(x.target.value)}}
              />
              &nbsp;  &nbsp;
              <TextField
                defaultValue="0"
                type="number"
                inputProps={{
                  min:0,
                  max:12
                }}
                variant="outlined"
                onChange={(x)=>{state==="ejemplo A"?answersExample[0][1]=parseInt(x.target.value):answersExample[1][1]=parseInt(x.target.value)}}
              />
            </div>
            : scored ? <h2><u><i>¡CORRECTO!</i></u></h2>:<h2><u><i>¡INCORRECTO!</i></u></h2> }
            
            <CustomButton 
            msj={scored===undefined?"Calificar":"Iniciar"}
            callback={scored===undefined? scoreExample : next}
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
              src={require("../../../assets/estimulos/conceptosDibujos-wisc/"+numberItem+".jpg")} />
            <div>
            <p>Respuestas:</p>
              <TextField
                
                type="number"
                value={fields[0]}
                inputProps={{
                  min:0,
                  max:12
                }}
                variant="outlined"
                onChange={(x)=>{
                  setFields([x.target.value,fields[1],fields[2]])
                  answers[numberItem-1][0]=parseInt(x.target.value)
                }}
              />
              &nbsp;  &nbsp;
              <TextField
                type="number"
                value={fields[1]}
                inputProps={{
                  min:0,
                  max:12
                }}
                variant="outlined"
                onChange={(x)=>{
                  setFields([fields[0],x.target.value,fields[2]])
                  answers[numberItem-1][1]=parseInt(x.target.value)
                }}
              />
              &nbsp;  &nbsp;
              { numberItem>=13 ? 
              <TextField
                type="number"
                value={fields[2]}
                inputProps={{
                  min:0,
                  max:12
                }}
                variant="outlined"
                onChange={(x)=>{
                  setFields([fields[0],fields[1],x.target.value])
                  answers[numberItem-1][2]=parseInt(x.target.value)
                }}
              />:""}
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
          <h1>Concepto con Dibujos</h1>
          <h3>El puntaje por cada ítem fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              [<h3 key={index+1}>ítem {index+1}</h3>,
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
                  defaultValue={index<=11 ? answers[index][0]+"-"+answers[index][1]:answers[index][0]+"-"+answers[index][1]+"-"+answers[index][2]}
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
                  defaultValue={index<=11 ? rightAnswers[index][0]+"-"+rightAnswers[index][1]:rightAnswers[index][0]+"-"+rightAnswers[index][1]+"-"+rightAnswers[index][2]}
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
           name="Conceptos con Dibujos"
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

export default connect(mapStateToProps, mapDispatchToProps)(ConceptoDibujos);
