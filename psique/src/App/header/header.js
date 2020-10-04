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
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import GestureIcon from '@material-ui/icons/Gesture';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    //backgroundColor: "#FFFFFF",
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
    backgroundColor: "#10cde7",
    maxHeight: "80px"
  },
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [exit] = useMutation(LOGIN_QUERY);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, props.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.spacer}>    
          <Toolbar>

              <img 
              className={classes.logo}
              alt="Logo"
              onClick={goBack}
              src={Logo}/>
              &nbsp;&nbsp;
              Psique
          </Toolbar>
          </Typography>

        <div className={classes.menuDiv}>

          <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleClick}
            >        
          <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{
              localStorage.clear();
              props.setDoctor(null)
              props.setBody("login")
            }}>Cerrar sesión.</MenuItem>
        </Menu>
        
        </div>
      </Toolbar>

      
    </AppBar>,
  <Drawer
    key={"DRAWE"}
    className={classes.drawer}
    variant="temporary"
    anchor="left"
    open={props.open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={props.handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
        <ListItem button onClick={() => {props.setBody("moduloPacientes")} }>
            <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
            <ListItemText primary={"Paciente"} />
        </ListItem>
        <ListItem button >
            <ListItemIcon><DescriptionIcon/></ListItemIcon>
            <ListItemText primary={"Informes"} />
        </ListItem>
        <ListItem button onClick={() => {props.setBody("init")} }>
            <ListItemIcon><GestureIcon/></ListItemIcon>
            <ListItemText primary={"Pruebas"} />
        </ListItem>
        <ListItem button >
            <ListItemIcon><PersonOutlineIcon/></ListItemIcon>
            <ListItemText primary={"Mi Perfil"} />
        </ListItem>
        {props.id_assessment!==null?
        <ListItem button onClick={save}>
            <ListItemIcon><SaveIcon/></ListItemIcon>
            <ListItemText primary={"Guardar y salir"} />
        </ListItem>:null}
        {props.id_assessment!==null?
        <ListItem button onClick={end}>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Terminar evaluación"} />
        </ListItem>:null}
    </List>
  </Drawer>]
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
