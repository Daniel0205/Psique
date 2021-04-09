import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from './snackbar'
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';
import { setDoctor } from "../store/doctor/action";
import { setBody } from "../store/body/action";
import { connect } from "react-redux";

//import  Logo from "../assets/Logo/logo72x83 - Color.png";
//import  Logo from "../assets/Logo/logo72x83 - Color Words1.png";
import  Logo from "../assets/Logo/logo72x83 - Color Words2.png";

import loginBackground from "../assets/Fondo/night-sky.jpg";

const LOGIN_QUERY = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: "url(" + loginBackground + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#017F8D",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    maxHeight: "130px",
  },
}));

function SignIn(props) {
  const [username,setUsername] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [msj, setMsj] = React.useState('');
  const [addTodo] = useMutation(LOGIN_QUERY);
  
  const classes = useStyles();


  async function login(){
    const {data}= await addTodo({ variables: { username:username, password:password} });
    
    if (data.login.ok) {
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('refreshToken', data.login.refreshToken);
      props.setDoctor(parseInt(username))
      props.setBody("assessment")
    }
    else setMsj("Usuario o contrasena incorrecto")
  }


  return(
    <Grid container component="main" className={classes.root} alignItems="center" justify="center">      
        <Snackbar
          onClose={()=>setMsj('')}
          variant="error" 
          message={msj}
        />
      <CssBaseline />      
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >
        <div className={classes.paper}>
          <img 
            className={classes.logo}
            alt="Logo"
            src={Logo}
          />
          
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              type="number"
              fullWidth
              label="Usuario"
              autoFocus
              value={username}
              onChange={(x)=>setUsername(x.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(x)=>setPassword(x.target.value)}

            />
            <Button
              fullWidth
              variant="contained"
              disabled={!(username!==""&&password!=="")}
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidó su contraseña?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>      
    </Grid>
  );
}


function mapDispatchToProps(dispatch) {
  return {
      setDoctor: (item) => dispatch(setDoctor(item)),
      setBody: (item) => dispatch(setBody(item))
  };
}

export default connect( null,mapDispatchToProps) (SignIn);