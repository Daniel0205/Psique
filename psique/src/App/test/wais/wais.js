import React,{useState} from 'react';
import TestStart from '../../components/testStart';
import CustomButton from '../../components/customButton';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../../store/body/action";
import { connect } from "react-redux";

import Aritmetica from "./subtest/aritmetica"
import Balanzas from "./subtest/balanzas"
import Cubos from "./subtest/cubos"
import BusquedaSimbolos from "./subtest/busquedaSimbolos"
import Cancelacion from "./subtest/cancelacion"
import ClavesNumeros from "./subtest/clavesNumeros"
import Comprension from "./subtest/comprension"
import Digitos from "./subtest/digitos"
import FigurasIncompletas from "./subtest/figurasIncompletas"
import Informacion from "./subtest/informacion"
import LetrasNumeros from "./subtest/letrasNumeros"
import Matrices from "./subtest/matrices"
import PuzlesVisuales from "./subtest/puzlesVisuales"
import Semejanzas from "./subtest/semejanzas"
import Vocabulario from "./subtest/vocabulario"


const texts = ["Cubos","Semejanzas","Digitos","Matrices",
"Vocabulario","Aritmetica","Busqueda de Simbolos",
"Puzles Visuales","Informacion","Clave de Numeros",
"Letras y Numeros","Balanzas","Comprension",
"Cancelacion","Figuras Incompletas"]

const componentTest = [<Cubos></Cubos>,
              <Semejanzas></Semejanzas>,
              <Digitos></Digitos>,
              <Matrices></Matrices>,
              <Vocabulario></Vocabulario>,
              <Aritmetica></Aritmetica>,
              <BusquedaSimbolos></BusquedaSimbolos>,
              <PuzlesVisuales></PuzlesVisuales>,
              <Informacion></Informacion>,
              <ClavesNumeros></ClavesNumeros>,
              <LetrasNumeros></LetrasNumeros>,
              <Balanzas></Balanzas>,
              <Comprension></Comprension>,
              <Cancelacion></Cancelacion>,
              <FigurasIncompletas></FigurasIncompletas>]


const useStyles = makeStyles({
  general: {
    textAlign: "center",
  },
  subprueba:{
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    paddingLeft: "10%",
    paddingRight: "10%",
    gridRowGap: "10%",
    gridColumnGap: "5%"
  }
});

function Wais(props) {
 const [state,setState] = useState("confirmacion")

 const classes = useStyles();

 function change(test){
    
    switch(state){
      case 'confirmacion':
        setState('aplicacion')
        break;
      case 'aplicacion':
          setState(test)
        break;
      default:
        break;
    }
  }

  function cancel(){
    props.setBody("init")
  }

  function content(){

    switch(state){
      case 'confirmacion':
        return(<TestStart
          name="Wais"
          change={change}
        ></TestStart>)
        
      case 'aplicacion':
        return(<div id='iniciowais' >
        <h1>WAIS</h1> <br/>
        <p>Estas son las subpruebas disponibles para aplicar al paciente, cliquea sobre una para empezar</p>
        <p>Recuerda que debes aplicar al menos 10 subpruebas</p>
        <br/>
    
        <div className={classes.subprueba}>
          {texts.map((name,i)=>
          <CustomButton
          key={i}
          msj={name}
          callback={()=>change(name)}>
          </CustomButton>)}
        </div>
        <br/>
        <br/>
    
        <CustomButton
          msj="Cancelar"
          callback={cancel}>
          </CustomButton>
    
      </div>)

      default:
        console.log("ENTROOOO")
        for (let i = 0; i < texts.length; i++) {
          console.log(state)
          console.log(texts[i])
          console.log(texts[i]===state)
          if(texts[i]===state) return componentTest[i]
        }
        break;
    }

  }


  return (
    <div className={classes.general} >
      {content()}
    
    </div>
  );
}


const mapStateToProps = (state) => {
  
  return {
    body: state.bodyReducer.body,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setBody: (item) => dispatch(setBody(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wais);

