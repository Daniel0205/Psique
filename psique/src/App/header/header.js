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
import Tooltip from '@material-ui/core/Tooltip';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { setDoctor } from "../store/doctor/action";
import { setBody } from "../store/body/action";
import { setAssessment } from "../store/assessment/action";
import { connect } from "react-redux";
import { useMutation, gql } from '@apollo/client';

import  Logo from "../assets/Logo/logo72x83.png"

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

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerVar, setdrawerVar] = React.useState(false);
  const [exit] = useMutation(LOGIN_QUERY);
  const [open, setOpen] = React.useState(true);

  /*const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  return [
    <div>
      <Tooltip title="Mostrar menú de la aplicación">
        <IconButton color="inherit" aria-label="open drawer"  onClick={handleDrawerOpen} className={clsx(open && classes.hide)}>
          <ExpandMoreIcon></ExpandMoreIcon> 
        </IconButton>
      </Tooltip>
        <Drawer          
          variant="persistent"
          anchor="top"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppBar key={"APPBAR"}
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
              })&& classes.header}
          >
            <Toolbar className={classes.tool}>
              <Tooltip title="Ocultar menú de la aplicación">
                <IconButton
                  color="inherit"
                  aria-label="close drawer"                
                  onClick={handleDrawerClose}>
                    <ExpandLessIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Menú de opciones">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                  className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
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
          </AppBar>
        </Drawer>,
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
              <BootstrapTooltip title="Ir al menu principal" placement="right">
              <ListItem button onClick={()=>props.setBody("init")} >            
                  <ListItemIcon className={classes.buttonDrawer}><HomeIcon/></ListItemIcon>
                  <ListItemText primary={"Inicio"} />            
              </ListItem></BootstrapTooltip>:null}
              <BootstrapTooltip title="Ver información del paciente" placement="right">
                <ListItem button >          
                  <ListItemIcon className={classes.buttonDrawer}><SupervisorAccountIcon/></ListItemIcon>
                  <ListItemText primary={"Paciente"} />
                </ListItem>
              </BootstrapTooltip>
              <BootstrapTooltip title="Ver informes poblacionales" placement="right">
                <ListItem button onClick={()=>window.location.replace(process.env.REACT_APP_CUBEJS_URL+"?token="+localStorage.token)}>
                  <ListItemIcon className={classes.buttonDrawer}><DescriptionIcon/></ListItemIcon>
                  <ListItemText primary={"Informes poblacionales"} />
                </ListItem>
              </BootstrapTooltip>
              <BootstrapTooltip title="Ver pruebas" placement="right">
                <ListItem button >
                  <ListItemIcon className={classes.buttonDrawer}><GestureIcon/></ListItemIcon>
                  <ListItemText primary={"Pruebas"} />
                </ListItem>
              </BootstrapTooltip>
              <BootstrapTooltip title="Ver información de perfil" placement="right">
                <ListItem button >
                  <ListItemIcon className={classes.buttonDrawer}><PersonOutlineIcon/></ListItemIcon>
                  <ListItemText primary={"Mi Perfil"} />
                </ListItem>
              </BootstrapTooltip>
              {props.id_assessment!==null?
              <BootstrapTooltip title="Guardar datos y salir" placement="right">
                <ListItem button onClick={save}>
                  <ListItemIcon className={classes.buttonDrawer}><SaveIcon/></ListItemIcon>
                  <ListItemText primary={"Guardar y salir"} />
                </ListItem></BootstrapTooltip>:null}
              {props.id_assessment!==null?
              <BootstrapTooltip title="Terminar evalución actual y salir" placement="right">
                <ListItem button onClick={end}>
                  <ListItemIcon className={classes.buttonDrawer}><AssignmentTurnedInIcon/></ListItemIcon>
                  <ListItemText primary={"Terminar evaluación"} />
                </ListItem></BootstrapTooltip>:null}
              <BootstrapTooltip title="Cerrar sesión y salir" placement="right">
                <ListItem button onClick={()=>{
                    localStorage.clear();
                    props.setDoctor(null)
                    props.setBody("login")
                  }}>
                  <ListItemIcon className={classes.buttonDrawer}><ExitToAppIcon/></ListItemIcon>
                  <ListItemText primary={"Cerrar sesión"} />
                </ListItem>
              </BootstrapTooltip>
          </List>
        </Drawer>      
  </div>]
}


const mapStateToProps = (state) => {
  
  return {
    id_assessment: state.assessmentReducer.id_assessment,
  };
};


function mapDispatchToProps(dispatch) {
  return {
      setDoctor: (item) => dispatch(setDoctor(item)),
      setBody: (item) => dispatch(setBody(item)),
      setAssessment: (item) => dispatch(setAssessment(item))
  };
}


export default connect(mapStateToProps,mapDispatchToProps) (Header);
