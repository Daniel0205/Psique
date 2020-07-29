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


const useStyles = makeStyles((theme) => ({
  general: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  subprueba:{
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    paddingLeft: "10%",
    paddingRight: "10%",
    gridRowGap: "10%",
    gridColumnGap: "5%"
  },
}));

function Wais(props) {
 const [state] = useState(props.subtest)

 const classes = useStyles();

  function content(){

    switch(state){
      case 'confirmacion':
        return(<TestStart
          name="WAIS"
          change={()=>props.setBody("WAIS-selection")}
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
          callback={()=>props.setBody("WAIS-"+name)}>
          </CustomButton>)}
        </div>
        <br/>
        <br/>
    
        <CustomButton
          msj="Cancelar"
          callback={()=>props.setBody("init")}>
        </CustomButton>

        <CustomButton
          msj="Calcular puntiación escalar"
          callback={()=>props.setBody("baremos")}>
        </CustomButton>
    
      </div>)

      default:

        for (let i = 0; i < texts.length; i++) {
          if((state)===texts[i]) return componentTest[i]
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

