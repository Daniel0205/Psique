import React from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../body/body';

import PatientModule from '../body/patientModule';
import PatientDetailsModule from '../body/patientDetails';
import ResearchModule from '../body/researchModule'

import Assessment from "./assessment"
import Header from "../header/header"
import Stroop from '../test/stroop/stroop';
import Wais from '../test/wais/wais';
import Wisc from '../test/wisc/wisc';
import Zung from '../test/zung/zung';
import King from '../test/king/king';
import Wada from '../test/wada/wada';
import Digits from '../test/digits/digits';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,    
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "-webkit-fill-available",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height: "-webkit-fill-available",
  },
  web:{
    height: "-webkit-fill-available",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

 
}));

function Sidenav(props) {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [aux, setAux] = React.useState("category");


  function body(){
    switch (props.body) {
      case 'init':
        return <Body callback={(x)=>setAux(x)}/>
      case 'assessment':
        return <Assessment/>
      case "WAIS IV":
        return <Wais  subtest={props.subtest}></Wais>
      case "WISC IV":
        return <Wisc subtest={props.subtest}></Wisc>
      case "Prueba de STROOP":
        return <Stroop ></Stroop>
      case "Prueba de Rey":
        return <King ></King>
      case "Prueba de Zung":
        return <Zung ></Zung>
      case "Wada":
        return <Wada></Wada>
      case 'moduloPacientes':
        return <PatientModule></PatientModule>
      case 'moduloDetallesPacientes':
        return <PatientDetailsModule></PatientDetailsModule>
      case 'moduloInvestigaciones':
        return <ResearchModule></ResearchModule>
      case "Prueba de los Cinco Dígitos":
        return <Digits></Digits>
      default:
        break;
    }
  }


  return (
    <div className={clsx({
      [classes.root]:true,
    })}>
      <CssBaseline />
      <Header></Header>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
          [classes.web]:aux
        })}
      >
         <div className={classes.drawerHeader}/>
          {body()}       
      </main>
    </div>
  );
}


export default (Sidenav);
