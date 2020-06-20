import React from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../body/body';
import Clouds from "../assets/Fondo/FondoNubes.jfif";

import Header from "../header/header"

import { setBody } from "../store/body/action";
import { connect } from "react-redux";
import Stroop from '../test/stroop/stroop';
import Wais from '../test/wais/wais';
import Wisc from '../test/wisc/wisc';
import Zung from '../test/zung/zung';
import King from '../test/king/king';


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
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: "-webkit-fill-available",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  

  function body(){
    switch (props.body) {
      case 'init':
        return [<Body key={props.body} callback={(x)=>props.setBody(x)}></Body>]
      case "WAIS IV":
        return [<Wais key={props.body} callback={(x)=>props.setBody(x)}></Wais>]
      case "WISC IV":
        return [<Wisc key={props.body} callback={(x)=>props.setBody(x)}></Wisc>]
      case "Prueba de STROOP":
        return [<Stroop key={props.body} callback={(x)=>props.setBody(x)}></Stroop>]
      case "Prueba de Rey":
        return [<King key={props.body} callback={(x)=>props.setBody(x)}></King>]
      case "Prueba de Zung":
        return [<Zung key={props.body} callback={(x)=>props.setBody(x)}></Zung>]
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
        })}
      >
         <div className={classes.drawerHeader}/>
          {body()}
       
      </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
