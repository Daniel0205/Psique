import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import TextField from '@material-ui/core/TextField';
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const TIME_LIMIT= 45;

let timeout;

const useStyles = makeStyles((theme) => ({
  root:{
    display: "grid",
    gridTemplateColumns: "60% 40%",
  },
  timer:{
    width: "50%",
  },
  fields:{
    display: "grid",
    gridTemplateColumns: "50% 50%",
  },
  revision:{
    paddingLeft: "25%",
    paddingRight: "25%",
  }

}));

let correct1Aux;
let incorrect1Aux;
let correct2Aux;
let incorrect2Aux;
let time1Aux;
let time2Aux;


function Registros(props) {
  const [state,setState]=useState("instruccion")
  const [active,setActive] = useState("iniciar")
  const [cronometro,setCronometro] = useState(0)
  const [timeover,setTimeover] = useState(0)
  const [reactivo,setReactivo] = useState(1)
  const [correct1,setCorrect1] = useState(0)
  const [incorrect1,setIncorrect1] = useState(0)
  const [correct2,setCorrect2] = useState(0)
  const [incorrect2,setIncorrect2] = useState(0)
  const [time1,setTime1] = useState(0)
  const [time2,setTime2] = useState(0)


  const classes = useStyles();

  function cronButton(){
    
    switch (active) {
      case "iniciar":
        
        return(
          <CustomButton 
          msj="Iniciar"
          callback={iniCron}></CustomButton> 
        )
      case "detener":                    
        return(
          <CustomButton 
          msj="Detener"
          callback={stopCron}></CustomButton> 
        )
      
      case "reiniciar":
        return(<CustomButton 
        msj="Reiniciar"
        callback={restart}></CustomButton> 
        )
      default:
        break;
    }

  }

  function calcularResultado(){
    let puntuacion=correct1-incorrect1
    if(puntuacion<0)puntuacion=0

    if(correct2-incorrect2>0)puntuacion+=correct2-incorrect2
    puntuacion+=getBonus(time1)
    puntuacion+=getBonus(time2)

    if(!props.resWechsler.hasOwnProperty('RG')){
      props.setResWechsler('RG',puntuacion)
    }else{
      if(props.resWechsler['RG'] !== puntuacion){
        props.setResWechsler('RG',puntuacion)
      }
    }

    return puntuacion

    
  }

  function startTimer(num) {
    
    if(cronometro!==45){

      timeout = setTimeout(() => {

        if(num<TIME_LIMIT) {
          setCronometro(num);
          startTimer(num+1)
        }
        else {
          setTimeover(true);
          setCronometro(45)
          setActive('reiniciar')
          if(reactivo===1)setTime1(45)
          else setTime2(45)
        }
      },1000)

    }
  }


  function iniCron(){
    setActive('detener')
    startTimer(1);
  }

  function stopCron(){

    clearTimeout(timeout);
    setActive('reiniciar');
    setTimeover(false);
    if(reactivo===1)setTime1(cronometro)
    else setTime2(cronometro)
  }


  function restart(){
    clearTimeout(timeout);
    setActive('iniciar');
    setCronometro(0)
    setTimeover(false);
  }

  function getBonus(time){
    if(time<=44 && time>=40)return 1
    else if(time<=39 && time>=35)return 2
    else if(time<=34 && time>=30)return 3
    else if(time<=29 && time>=0)return 4
    else return 0
  }
  

  function content(){
    switch(state){
      case "instruccion":
        return(
        <div >
          <h1>Registros</h1>
          <b>instrucciones generales:</b>
          <p>El paciente recibirá una hoja con diferentes objetos y animales</p>
          <p>en ella deberá tachar con un lápiz todos los animales que alcance en el tiempo</p>
          <br/>
          <b>Instrucciones de calificación:</b>
          <p>Al final de cada ítem se registraron las respuestas correctas e incorrectas</p>
          <p>El sistema calificará automáticamente la respuesta</p>
          <br/>
          <CustomButton
          msj="Iniciar Subrueba"
          callback={()=>setState("seleccion")}
          ></CustomButton>
        </div>
        )
      case "seleccion":
        return(
        <div >
        <h1>Registros</h1>
        <p>Pacientes de edad 6-16:</p>
          <CustomButton
          msj="Iniciar Subrueba"
          callback={()=>setState("test")}
          ></CustomButton>
        </div>
        )

      case 'test':
        return(
          <div  className={classes.root} >
            <div >
              
              <h1>Registros</h1>
              <h2>Reactivo {reactivo}</h2>
              <div className={classes.fields}>
                <TextField
                  id="outlined-number"
                  label="Respuestas Correctas"
                  required
                  value={reactivo===1 ? correct1 : correct2}
                  type="number"
                  inputProps={{
                    min:0,
                    max:68
                  }}
                  onChange={(x)=>reactivo===1 ? setCorrect1(x.target.value) :setCorrect2(x.target.value)}
                  variant="outlined"
                />
                
                <TextField
                  id="outlined-number"
                  label="Respuestas Incorrectas"
                  required
                  type="number"
                  value={reactivo===1 ? incorrect1 : incorrect2}
                  inputProps={{
                    min:0,
                    max:68
                  }}
                  onChange={(x)=>reactivo===1 ? setIncorrect1(x.target.value) :setIncorrect2(x.target.value)}
                  variant="outlined"
                />
              </div>
              <div>
                <h2>Tiempo</h2>
                <TextField
                  id="outlined-number"
                  className={classes.timer}
                  label="Tiempo registrado (Seg)"
                  type="number"
                  value={reactivo===1 ? time1 : time2}
                  inputProps={{
                    min:0,
                    max:45
                  }}
                  onChange={(x)=>reactivo===1 ? setTime1(x.target.value) :setTime2(x.target.value)}
                  variant="outlined"
                />
              </div>
              <br/>
              <br/>
              <CustomButton 
                msj={reactivo===1 ? "Siguiente Reactivo" :"Calificar"}
                callback={reactivo===1 ? ()=>{
                  clearTimeout(timeout)
                  setActive("iniciar")
                  setCronometro(0)
                  setReactivo(2)
                } :()=>setState('resultados')}
              ></CustomButton>

            </div>
            
            <div id='timer' >
                <h1>Temporizador</h1>
                {cronometro<10 ? <h1>00:0{cronometro}</h1> : <h1>00:{cronometro}</h1> }
                {cronButton()}            
            </div>
          </div>
        )
      case "resultados":
      return(
        <Results
          name="Registros"
          result={calcularResultado()}
          callback={()=>{
            correct1Aux=correct1
            correct2Aux=correct2
            incorrect1Aux=incorrect1
            incorrect2Aux=incorrect2
            time1Aux=time1
            time2Aux=time2
            setState("revision")
          }}
          url="WISC-selection"
        ></Results>
      )
      case "revision":
        return ( 
        <div  >
          <div className={classes.revision}>
          <h1>Registros</h1>
            <h2>Reactivo 1</h2>
            <div className={classes.fields}>
              <TextField
                id="outlined-number"
                label="Respuestas Correctas"
                required
                value={correct1 }
                type="number"
                inputProps={{
                  min:0,
                  max:68
                }}
                onChange={(x)=>setCorrect1(x.target.value) }
                variant="outlined"
              />
              
              <TextField
                id="outlined-number"
                label="Respuestas Incorrectas"
                required
                type="number"
                value={incorrect1}
                inputProps={{
                  min:0,
                  max:68
                }}
                onChange={(x)=>setIncorrect1(x.target.value) }
                variant="outlined"
              />
            </div>
            <div>
              <h2>Tiempo</h2>
              <TextField
                id="outlined-number"
                className={classes.timer}
                label="Tiempo registrado (Seg)"
                required
                type="number"
                value={time1}
                inputProps={{
                  min:0,
                  max:45
                }}
                onChange={(x)=>setTime1(x.target.value) }
                variant="outlined"
              />
            </div>
          </div>
          <br/>
          <div className={classes.revision}>
            <h2>Reactivo 2</h2>
            <div className={classes.fields}>
              <TextField
                id="outlined-number"
                label="Respuestas Correctas"
                required
                value={ correct2}
                type="number"
                inputProps={{
                  min:0,
                  max:68
                }}
                onChange={(x)=>setCorrect2(x.target.value)}
                variant="outlined"
              />
              
              <TextField
                id="outlined-number"
                label="Respuestas Incorrectas"
                required
                type="number"
                value={incorrect2}
                inputProps={{
                  min:0,
                  max:68
                }}
                onChange={(x)=>setIncorrect2(x.target.value)}
                variant="outlined"
              />
            </div>
            <div>
              <h2>Tiempo</h2>
              <TextField
                id="outlined-number"
                className={classes.timer}
                label="Tiempo registrado (Seg)"
                type="number"
                value={time2}
                inputProps={{
                  min:0,
                  max:45
                }}
                onChange={(x)=>setTime2(x.target.value)}
                variant="outlined"
              />
            </div>
          </div>
          <CustomButton 
            msj={"Actualizar"}
            callback={()=>setState('resultados')}
          ></CustomButton>
          <CustomButton 
            msj={"cancelar"}
            callback={()=>{
              setState('resultados')
              setCorrect1(correct1Aux)
              setCorrect2(correct2Aux)
              setIncorrect1(incorrect1Aux)
              setIncorrect2(incorrect2Aux)
              setTime1(time1Aux)
              setTime2(time2Aux)
            }}
          ></CustomButton>
        </div>)
      default:
          break;
    }

  }


  return (
   <div>
     {content()}
     {timeover ? <h2><u><i>¡TIEMPO TERMINADO!</i></u></h2>: ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(Registros);