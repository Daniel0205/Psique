import React,{useState,useEffect} from 'react';
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


const texts =["Cubos","Semejanzas","Dígitos","Matrices",
"Vocabulario","Aritmética","Búsqueda de Símbolos",
"Puzles Visuales","Información","Clave de Números",
"Letras y Números","Balanzas","Comprensión",
"Cancelación","Figuras Incompletas"]


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

function Wais(props) {
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
          name="WAIS"
          change={()=>props.setBody("WAIS-selection")}
        ></TestStart>)
        
      case 'aplicacion':
        return(
        <div id='iniciowais'>
          <Grid className={classes.gridTextStyle}>
            <Typography  variant="h4">
              WAIS
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
                  callback={()=>props.setBody("WAIS-"+name)}>
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
              onClick={()=>props.setBody("WAIS-baremos")}
              className={classes.calcularButton}>
                Calcular puntuación escalar
            </Button>
          </Grid>    
      </div>)

      case 'baremos':
        return(<Baremos
          name="WAIS"
        ></Baremos>)

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

export default connect(mapStateToProps, mapDispatchToProps)(Wais);

