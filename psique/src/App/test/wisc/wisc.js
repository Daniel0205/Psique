import React,{useState, useEffect} from 'react';
import TestStart from '../../components/testStart';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import WaisWiscTestsButton from '../../components/WaisWiscTestsButton';
import Baremos from '../../components/Baremos';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../../store/body/action";
import { resetResWechsler, resetSession} from "../../store/wechsler/action";
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


const texts =  ["Cubos","Semejanzas","Dígitos",
"Conceptos con dibujos","Claves","Vocabulario","Sucesion de numeros y letras",
"Matrices","Comprensión","Búsqueda de símbolos","Figuras incompletas",
"Registros","Información", "Aritmética","Pistas"]

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

const useStyles = makeStyles((theme) => ({
  general: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  gridTextStyle: {
    paddingTop: "15px",
    paddingBottom: "10px",    
  },
  gridButtonsStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  gridBottomStyle: {
    paddingTop: "10px",
    paddingBottom: "15px",    
  },
  cancelarButton: {
    margin: theme.spacing(1), 
    backgroundColor: "#87262C",
    color: "white",
    "&:hover":{
      backgroundColor: "#712329",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    textTransform: "none",
  },
  calcularButton: {
    margin: theme.spacing(1), 
    backgroundColor: "#63B884",
    color: "white",
    "&:hover":{
      backgroundColor: "#5DAF9A",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    textTransform: "none",
  },
}));

function Wisc(props) {
 const [state] = useState(props.subtest)

 const classes = useStyles();

  // Esta función cambia el estado de redux que guarda los resultados de las subpruebas
  function emptyState(){
    if(!props.session.active){//Si la sesion no esta activa
     props.resetSession('WAIS',true) 
     props.resetResWechsler()
    }
   
  }
 
  useEffect(emptyState,[])

  function content(){

    switch(state){
      case 'confirmacion':
        return(<TestStart
          name="WISC"
          change={()=>props.setBody("WISC-selection")}
        ></TestStart>)
        
      case 'aplicacion':
        return(
        <div id='inicioWisc' >
          <Grid className={classes.gridTextStyle}>
              <Typography  variant="h4">
                WISC
              </Typography>        
              <Typography  variant="body1" component="h6">
                Estas son las subpruebas disponibles para aplicar al paciente, cliquea sobre una para empezar 
              </Typography>
              <Typography  variant="body1" component="h6">
                Recuerda que debes aplicar al menos 10 subpruebas
              </Typography>
            </Grid>
    
            <Grid container className={classes.gridButtonsStyle} justify="space-evenly" alignItems="center" spacing={3}>
              {texts.map((name,i)=>
                <Grid item key={i} xs>
                  <WaisWiscTestsButton
                    msj={name}
                    callback={()=>props.setBody("WISC-"+name)}>
                  </WaisWiscTestsButton>
                </Grid>)
              }
            </Grid>
    
            <Grid container justify="center" className={classes.gridBottomStyle}>
          <Button variant="contained" color="primary"
            onClick={()=>props.setBody("init")}
            className={classes.cancelarButton}>
              Cancelar
          </Button>
          <Button variant="contained" color="primary"
            onClick={()=>props.setBody("WISC-baremos")}
            className={classes.calcularButton}>
              Calcular puntuación escalar
          </Button>
        </Grid>
      </div>)

      case 'baremos':
        return(<Baremos
          name="WISC"
        ></Baremos>)

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
    session: state.wechslerReducer.session,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setBody: (item) => dispatch(setBody(item)),
    resetResWechsler: () => dispatch(resetResWechsler()),
    resetSession: (itemTest,itemActive) => dispatch(resetSession(itemTest,itemActive)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wisc);

