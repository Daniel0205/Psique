import React,{useState} from 'react';
import TestStart from '../../components/testStart';
import CustomButton from '../../components/customButton';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../../store/body/action";
import { connect } from "react-redux";

import Aritmetica from "./subtest/aritmetica"
import Cubos from "./subtest/cubos"
import Claves from "./subtest/claves"
import ConceptoDibujos from "./subtest/conceptoDibujos"
import BusquedaSimbolos from "./subtest/busquedaSimbolos"
import Comprension from "./subtest/comprension"
import Digitos from "./subtest/digitos"
import FigurasIncompletas from "./subtest/figurasIncompletas"
import Informacion from "./subtest/informacion"
import LetrasNumeros from "./subtest/letrasNumeros"
import Matrices from "./subtest/matrices"
import Pistas from "./subtest/pistas"
import Registros from "./subtest/registros"
import Semejanzas from "./subtest/semejanzas"
import Vocabulario from "./subtest/vocabulario"


const texts = ["Cubos","Semejanzas","Dígitos",
"Conceptos con dibujos","Claves","Vocabulario","Sucesion de numeros y letras",
"Matrices","Comprension","Busqueda de simbolos","Figuras incompletas",
"Registros","Informacion", "Aritmetica","Pistas"]

const componentTest = [<Cubos></Cubos>,
                    <Semejanzas></Semejanzas>,
                    <Digitos></Digitos>,
                    <ConceptoDibujos></ConceptoDibujos>,
                    <Claves></Claves>,
                    <Vocabulario></Vocabulario>,
                    <LetrasNumeros></LetrasNumeros>,
                    <Matrices></Matrices>,
                    <Comprension></Comprension>,
                    <BusquedaSimbolos></BusquedaSimbolos>,
                    <FigurasIncompletas></FigurasIncompletas>,
                    <Registros></Registros>,
                    <Informacion></Informacion>,
                    <Aritmetica></Aritmetica>,
                    <Pistas></Pistas>]

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

function Wisc(props) {
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
          name="Wisc"
          change={change}
        ></TestStart>)
        
      case 'aplicacion':
        return(<div id='inicioWisc' >
        <h1>WISC</h1> <br/>
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
        for (let i = 0; i < texts.length; i++) {
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

export default connect(mapStateToProps, mapDispatchToProps)(Wisc);

