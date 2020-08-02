import React from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../body/body';
import Clouds from "../assets/Fondo/FondoNubes.jfif";

import Header from "../header/header"
import Stroop from '../test/stroop/stroop';
import Wais from '../test/wais/wais';
import Wisc from '../test/wisc/wisc';
import Zung from '../test/zung/zung';
import King from '../test/king/king';
import Baremos from './Baremos';
import Wada from '../test/wada/wada';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  cover:{
    backgroundImage: "url("+Clouds+")",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  
  const [open, setOpen] = React.useState(false);
  const [aux, setAux] = React.useState("category");

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  

  function body(){
    switch (props.body) {
      case 'init':
        return <Body callback={(x)=>setAux(x)}/>
      case 'baremos':
        return <Baremos></Baremos>
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
      default:
        break;
    }
  }


  return (
    <div className={clsx({
      [classes.root]:true,
      [classes.cover]:props.body==='init'
    })}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}></Header>
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
