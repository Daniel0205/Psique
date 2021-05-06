import React from "react";
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import GestureIcon from '@material-ui/icons/Gesture';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import clsx from 'clsx';
import { setDoctor, setFhirDoctor } from "../store/doctor/action";
import { setBody } from "../store/body/action";
import { setAssessment } from "../store/assessment/action";
import { connect } from "react-redux";
import { useMutation, gql } from '@apollo/client';

import {verifyPractitioner,createPractitioner,doctorParser} from '../body/transmision.js';

import  Logo from "../assets/Logo/logo72x83.png"
import { Button } from "@material-ui/core";

const LOGIN_QUERY = gql`
  mutation($id_assessment: ID!) {
    exitAssessment(id_assessment: $id_assessment) {
      ok
      error{
        path
        message
      }
    }
  }
`;


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  tool:{
    width:'100%'
  },
  spacer:{
    minWidth: "max-content",
  },
  logo: {
    maxHeight: "60px",
    paddingBottom: "2px",
    paddingTop: "2px",
    //backgroundColor: "#FFFFFF",
  },
  buttonDrawer:{
    color: "white",
  },
  drawerDivider:{
    backgroundColor: "white",
  },
 
  menuDiv:{
    width: "-webkit-fill-available",
    textAlign: "-webkit-right",
  },
  drawer: {
    height: "-webkit-fill-available",
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    backgroundColor: "#017F8D",   
    width: drawerWidth,
    color: "white",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  header: {
    display: "-webkit-box",
    backgroundColor: "#017F8D",
    height: "70px",
    maxHeight: "80px"
  },
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerVar, setdrawerVar] = React.useState(false);
  const [registrationVar, setregistrationVar] = React.useState(false);
  const [exit] = useMutation(LOGIN_QUERY);

  /*const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setdrawerVar(open);
  };

  function goBack(){
    if(props.id_assessment!==null) props.setBody("init")
    else props.setBody("assessment")
  }

  function save(){
    props.setBody("assessment")
    props.setAssessment(null)
  }

  async function end(){
    
    const {data}= await exit({ variables: {id_assessment:props.id_assessment} });

    if (data.exitAssessment.ok)save()
  }

  function accessResearch(){
    verifyPractitioner(props.id_doctor).then( res => {
      if(res.total===1){
        props.setFhirDoctor(res.entry[0].resource.id)
        props.setBody("moduloInvestigaciones")
      }else if(res.total===0){
        setregistrationVar(true)
      }
    })
  }

  function crearPractitioner(){
    
    let objPract = {
      identifier: props.id_doctor,
      name: 'Steban Cadena Giraldo'
    }

    createPractitioner(doctorParser(objPract)).then(res=>{
      props.setFhirDoctor(res.id)
      alert("Tus datos han sido cargados con exito - tu ID es " + String(res.id))
      props.setBody("moduloInvestigaciones")
    })
  }

  return [
  <AppBar key={"APPBAR"}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open,
      })&& classes.header}
    >
      <Toolbar className={classes.tool}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          className={clsx(classes.menuButton, props.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.spacer}>
          <Toolbar>
              <img 
              className={classes.logo}
              alt="Logo"
              onClick={goBack}
              src={Logo}/>
              &nbsp;&nbsp;
              <Typography variant="h6" className={classes.spacer}>
                Psique
              </Typography>
          </Toolbar>
        </div>      
      </Toolbar>

      
    </AppBar>,
  <Drawer
    key={"DRAWE"}
    className={classes.drawer}
    variant="temporary"
    anchor="left"
    open={drawerVar}
    onClose={toggleDrawer(false)}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={toggleDrawer(false)} className={classes.buttonDrawer}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider className={classes.drawerDivider} />
    <List>

        {props.id_assessment!==null?
        <ListItem button onClick={()=>props.setBody("init")} >
            <ListItemIcon className={classes.buttonDrawer}><HomeIcon/></ListItemIcon>
            <ListItemText primary={"Inicio"} />
        </ListItem>:null}

        <ListItem button onClick={() => {props.setBody("moduloPacientes")} } >
            <ListItemIcon className={classes.buttonDrawer}><SupervisorAccountIcon/></ListItemIcon>
            <ListItemText primary={"Paciente"} />
        </ListItem>

        <ListItem button >
            <ListItemIcon className={classes.buttonDrawer}><DescriptionIcon/></ListItemIcon>
            <ListItemText primary={"Informes"} />
        </ListItem>

        <ListItem button onClick={() => {props.setBody("init")}}>
            <ListItemIcon className={classes.buttonDrawer}><GestureIcon/></ListItemIcon>
            <ListItemText primary={"Pruebas"} />
        </ListItem>

        <ListItem button >
            <ListItemIcon className={classes.buttonDrawer}><PersonOutlineIcon/></ListItemIcon>
            <ListItemText primary={"Mi Perfil"} />
        </ListItem>

        <ListItem button onClick={accessResearch}>
            <ListItemIcon className={classes.buttonDrawer}><AccountTreeIcon/></ListItemIcon>
            <ListItemText primary={"Investigaciones"} />
        </ListItem>

        {props.id_assessment!==null?
        <ListItem button onClick={save}>
            <ListItemIcon className={classes.buttonDrawer}><SaveIcon/></ListItemIcon>
            <ListItemText primary={"Guardar y salir"} />
        </ListItem>:null}

        {props.id_assessment!==null?
        <ListItem button onClick={end}>
            <ListItemIcon className={classes.buttonDrawer}><AssignmentTurnedInIcon/></ListItemIcon>
            <ListItemText primary={"Terminar evaluación"} />
        </ListItem>:null}

        <ListItem button onClick={()=>{
              localStorage.clear();
              props.setDoctor(null)
              props.setBody("login")
            }}>
            <ListItemIcon className={classes.buttonDrawer}><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Cerrar sesión"} />
        </ListItem>

    </List>
  </Drawer>,
  <Dialog
  key={"REG"}
  open={registrationVar}
  onClose={()=>{setregistrationVar(false)}}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Registro"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        ¿Deseas registrar tus datos en el servidor de investigaciones?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>{setregistrationVar(false)}} color="primary">
        Cancelar
      </Button>
      <Button onClick={crearPractitioner} color="primary">
        Registrarme
      </Button>
    </DialogActions>
  </Dialog>]
}


const mapStateToProps = (state) => {
  
  return {
    id_assessment: state.assessmentReducer.id_assessment,
    id_doctor: state.doctorReducer.id_doctor,
    id_fhir_doctor: state.doctorReducer.id_fhir_doctor,
  };
};


function mapDispatchToProps(dispatch) {
  return {
      setDoctor: (item) => dispatch(setDoctor(item)),
      setFhirDoctor: (item) => dispatch(setFhirDoctor(item)),
      setBody: (item) => dispatch(setBody(item)),
      setAssessment: (item) => dispatch(setAssessment(item))
  };
}


export default connect(mapStateToProps,mapDispatchToProps) (Header);
