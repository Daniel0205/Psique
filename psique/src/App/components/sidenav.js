import React from 'react';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Body from '../body/body';
import Clouds from "../assets/Fondo/FondoNubes.jfif";

import Header from "../header/header"


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

 
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}></Header>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
         <div className={classes.drawerHeader}/>
          <Body></Body>
       
      </main>
    </div>
  );
}
