import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 2

const NUMBER_STIMULI = 16

let estimulosDD = [['2','9'],['4','6'],
                  ['3','8','6'],['6','1','2'],
                  ['3','4','1','7'],['6','1','5','8'],
                  ['5','2','1','8','6'],['8','4','2','3','9'],
                  ['3','8','9','1','7','4'],['7','9','6','4','8','3'],
                  ['5','1','7','4','2','3','8'],['9','8','5','2','1','6','3'],
                  ['1','8','4','5','9','7','6','3'],['2','9','7','6','3','1','5','4'],
                  ['5','3','8','7','1','2','4','6','9'],['4','2','6','9','1','7','8','3','5']];

let estimulosDI = [['2','1'],['1','3'],
                  ['3','5'],['6','4'],
                  ['2','5','9'],['5','7','4'],
                  ['8','4','9','3'],['7','2','9','6'],
                  ['4','1','3','5','7'],['9','7','8','5','2'],
                  ['1','6','5','2','9','8'],['3','6','7','1','9','4'],
                  ['8','5','9','2','3','4','6'],['4','5','7','9','2','8','1'],
                  ['6','9','1','7','3','2','5','8'],['8','1','7','9','5','4','8','2']];

let respuestasCorrectasDI =  [['1','2'],['3','1'],
                              ['5','3'],['4','6'],
                              ['9','5','2'],['4','7','5'],
                              ['3','9','4','8'],['6','9','2','7'],
                              ['7','5','3','1','4'],['2','5','8','7','9'],
                              ['8','9','2','5','6','1'],['4','9','1','7','6','3'],
                              ['6','4','3','2','9','5','8'],['1','8','2','9','7','5','4'],
                              ['8','5','2','3','7','1','9','6'],['2','8','4','5','9','7','1','8']];

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
                             

function Digitos(props) {

  const classes = useStyles();
  const [state,setState]=useState("instruccion")
  const [resultsD, setResultsD] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsDAux ,setResultsDAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsI, setResultsI] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsIAux ,setResultsIAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const [answersD,setAnswersD] =  useState(["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"])
  const [answersI,setAnswersI] =  useState(["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"])

  function changeStimuli(key){

    if(state==='testDirecto'){
          
      if(1===key){
        
        setResultsD(update(resultsD,{
          [numberItem-1]: {
            $set: 1
          }}))
        terminacion=0
      }
      else{
        if((numberItem-1)%2===0)terminacion=0
        terminacion++;

      }

      if(numberItem===NUMBER_STIMULI || terminacion===LIMIT_ERROR){
        setState('initInverso')
        setNumberItem(1);
      }
      else{      
        setNumberItem(numberItem+1);
      }
      
    }else if(state==='testInverso'){

      if(1===key){
        
        setResultsI(update(resultsI,{
          [numberItem-1]: {
            $set: 1
          }}))
        terminacion=0
      }
      else{
        if((numberItem-1)%2===0)terminacion=0
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
    setState('initDirecto')
  }


  function next(){
    switch (state) {
      case 'results':
        setState('revision')
        setResultsDAux(resultsD)
        setResultsIAux(resultsI)
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

    var totalAux=[0,0]

    for(var i=0;i<resultsD.length;i++){
      totalAux[0] = totalAux[0] + resultsD[i];
      totalAux[1] = totalAux[1] + resultsI[i];
    }

    var total = totalAux[0] + totalAux[1]

    if(!props.resWechsler.hasOwnProperty('RD')){
      props.setResWechsler('RD',total)
    }else{
      if(props.resWechsler['RD'] !== total){
        props.setResWechsler('RD',total)
      }
    }

    return total;
  }

  function score(index){
    
    let arrayD=answersD[index].slice()
    let arrayI=answersI[index].slice()

    let respuestasD=estimulosDD[index].slice()
    let respuestasI=respuestasCorrectasDI[index].slice()

    if(state==="testDirecto"){

      if(arrayD.split("").join(',') === respuestasD.join(',') ){
        changeStimuli(1)
      }
      else  changeStimuli(0)

    }else if(state==="testInverso"){

      if(arrayI.split("").join(',') === respuestasI.join(',') ){
        changeStimuli(1)
      }
      else  changeStimuli(0)

    }
    
  }
  

  function content(){  
    switch (state) {
      case 'instruccion':
        return (
        <div>
         <h1>Dígitos</h1>
         <b>instrucciones generales:</b>
         <p>Se realizarán dos puebas que consisten en las que el profesional dictara una lista de números </p>
         <p>y la tarea del paciente es repetir y repetir en orden inverso</p>
         <p>Los items se presentan de forma verbal</p>
         <br/>
         <b>instrucciones de calificacion:</b>
         <p>Para calificar debe escribir los números que de el paciente en el espacio asignado y luego oprimir el botón "Siguiente"</p>
         <p>El sistema se encargará de asignar la puntuación correspondiente</p>
         <br/>
        <CustomButton
          msj="Iniciar subprueba"
          callback={()=>imagenInit(1)}
        ></CustomButton>  
      </div>)
     case "initDirecto":
      return (
        <div>
         <h1>Dígitos en Orden directo</h1>
        <CustomButton
          msj="Iniciar Digitos en orden directo"
          callback={()=>setState('testDirecto')}
        ></CustomButton>  
      </div>)
       case "testDirecto":
         return(
         <div>
             <h1> Estimulo {Math.trunc((numberItem-1)/2)+1}- Intento # {(numberItem-1)%2+1}</h1>
             <br/>
             <br/>
             <h1>{estimulosDD[numberItem-1].join("-")}</h1>
             
             <p>Respuesta:</p>
             
             <div className={classes.field}>
               <TextField
                 value={answersD[numberItem-1].split("").join("-")}
                 variant="outlined"
                 onChange={(x)=>{
                   setAnswersD(update(answersD,{
                     [numberItem-1]: {
                       $set: x.target.value.toUpperCase().split("-").join("").slice(0,estimulosDD[numberItem-1].length)
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
      case "initInverso":
          return (
            <div>
             <h1>Dígitos en Orden inverso</h1>
            <CustomButton
              msj="Iniciar Digitos en orden inverso"
              callback={()=>setState('testInverso')}
            ></CustomButton>  
          </div>)
      case "testInverso":
        return(
        <div>
            
            <h1> Estimulo {Math.trunc((numberItem-1)/2)+1}- Intento # {(numberItem-1)%2+1}</h1>
            <br/>
            <br/>
            <h1>{estimulosDI[numberItem-1].join("-")}</h1>
            
            <p>Respuesta:</p>
            
            <div className={classes.field}>
              <TextField
                value={answersI[numberItem-1].split("").join("-")}
                variant="outlined"
                onChange={(x)=>{
                  setAnswersI(update(answersI,{
                    [numberItem-1]: {
                      $set: x.target.value.toUpperCase().split("-").join("").slice(0,estimulosDI[numberItem-1].length)
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


           <h3>El puntaje por cada Item de dígitos directos fue: </h3>
           <div className={classes.fields}>
             {resultsD.map((result,index)=>
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
                     setResultsDAux(update(resultsDAux,{
                       [index]: {
                         $set: parseInt(x.target.value)
                       }}))}
                 />
                  &nbsp;  &nbsp;
                 <TextField
                   className={classes.textfield}
                   label="Respuesta-paciente"
                   defaultValue={answersD[index].split("").join("-")}
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
                   defaultValue={estimulosDD[index].join("-")}
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


             <h3>El puntaje por cada Item de dígitos inversos fue: </h3>
             <div className={classes.fields}>
             {resultsI.map((result,index)=>
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
                     setResultsIAux(update(resultsIAux,{
                       [index]: {
                         $set: parseInt(x.target.value)
                       }}))}
                 />
                  &nbsp;  &nbsp;
                 <TextField
                   className={classes.textfield}
                   label="Respuesta-paciente"
                   defaultValue={answersI[index].split("").join("-")}
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
                   defaultValue={respuestasCorrectasDI[index].join("-")}
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
                   setResultsD(resultsDAux)
                   setResultsI(resultsIAux)
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

export default connect(mapStateToProps, mapDispatchToProps)(Digitos);
