import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TestStart from '../../components/testStart';
import CustomButton from '../../components/customButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Link
} from "react-router-dom";

const useStyles =  makeStyles((theme) => ({
  general: {
    textAlign: "center",
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
    marginBottom: '5%',
    padding: "10%"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  block: {  
    display: "block"
  },
  secondPaper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  root: {
    alignContent: 'left',
    marginLeft: '5%',
    marginRight: '5%',
  },
  btn: {
      font: "bold 11px Arial",
      textDecoration: "none",
      backgroundColor: "#EEEEEE",
      color: "#333333",
      padding: "2px 6px 2px 6px",
      borderTop: "1px solid #CCCCCC",
      borderRight: "1px solid #333333",
      borderBottom: "1px solid #333333",
      borderLeft: "1px solid #CCCCCC",
  }
}));

function Stroop() {
  const classes = useStyles();



  const palabras = ["Rojo", "Verde", "Azul", "Verde", "Rojo", "Azul", "Rojo", "Azul", "Verde", "Azul",
                    "Verde", "Rojo", "Verde", "Azul", "Rojo", "Azul", "Rojo", "Verde", "Rojo", "Verde",
                    "Azul", "Verde", "Rojo", "Azul", "Rojo", "Verde", "Azul", "Verde", "Rojo", "Verde",
                    "Rojo", "Azul", "Rojo", "Azul", "Verde", "Azul", "Verde", "Rojo", "Azul", "Rojo",
                    "Verde", "Rojo", "Azul", "Rojo", "Verde", "Azul", "Verde", "Rojo", "Azul", "Verde",
                    "Azul", "Rojo", "Azul", "Rojo", "Verde", "Rojo", "Azul", "Verde", "Rojo", "Verde",
                    "Rojo", "Azul", "Verde", "Rojo", "Azul", "Verde", "Azul", "Verde", "Rojo", "Azul",
                    "Rojo", "Verde", "Rojo", "Verde", "Azul", "Verde", "Rojo", "Azul", "Verde", "Azul",
                    "Azul", "Verde", "Rojo", "Azul", "Verde", "Rojo", "Verde", "Rojo", "Azul", "Verde",
                    "Rojo", "Azul", "Verde", "Rojo", "Azul", "Rojo", "Verde", "Azul", "Rojo", "Verde" ];

  const colores =  ["blue","red","green","blue","green","red","green","red","blue","red",
                    "blue", "green","red","green","blue","green","blue","red","green","blue",
                    "red","blue","green","red","green","blue","green","red","blue","red",
                    "blue","green","blue","green","red","green","red","blue","red","green",
                    "blue","green","red","blue","red","green","red","blue","green", "red",
                    "green","blue","red","green","blue","green","red","blue","green","blue",
                    "green","red","blue","green","red","blue","green","red","blue","green",
                    "blue","red","blue","red","green","blue","green","red","blue","red",
                    "red","blue","green","red","blue","green","red","blue","green","blue",
                    "green","red","blue","green","red","blue","red","green","blue","red"];

  const [subPage,setSubPage] = useState("confirmacion")
  
  //Estas variables son los indices de las palabras inicializados en 0
  const [palabraIndex,setPalabraIndex] = useState(0);
  const [colorIndex,setColorIndex] = useState(0);
  const [palabraColorIndex,setPalabraColorIndex] = useState(0);
  const [PC2,setPC2] = useState(0);
  const [interferencia,setInterferencia] = useState(0);

  useEffect(() => {
    change();
  },[palabraColorIndex]);

 //===Funciones que cambian el indice de las palabras===
  function marcaPalabra(e){
    setPalabraIndex(Number(e.currentTarget.id))
    change();
  }

  function marcaColor(e){
    setColorIndex(Number(e.currentTarget.id))
    change();
  }

  function marcaPalabraColor(e){
    setPalabraColorIndex(Number(e.currentTarget.id))
  }
  //=====================================================

  //Esto se encarga de llenar la página de palabras con los valores correpsondientes
  let palabrasCut = palabras.slice(0,20);

  let llenarPalabras = palabrasCut.map( (value,i) => {
      return(
        <Grid container key={i+90} item xs="auto" spacing={3}>
            <Grid xs="1" item>
              <Paper></Paper>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i} id={i} onClick={(e) => {marcaPalabra(e)}}>{palabras[i]}</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+20} id={i+20} onClick={(e) => {marcaPalabra(e)}}>{palabras[i+20]}</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+40} id={i+40} onClick={(e) => {marcaPalabra(e)}}>{palabras[i+40]}</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+60} id={i+60} onClick={(e) => {marcaPalabra(e)}}>{palabras[i+60]}</Button>
            </Grid> 
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+80} id={i+80} onClick={(e) => {marcaPalabra(e)}}>{palabras[i+80]}</Button>
            </Grid> 
            <Grid xs="1" item>
              <Paper></Paper>
            </Grid>     
          </Grid>
      )
    }
  )

  //Esto se encarga de llenar la página de Colores con los valores correpsondientes

  let llenarColores = palabrasCut.map( (value,i) => {
      return(
        <Grid container item xs="auto" spacing={3}>
            <Grid xs="1" item>
              <Paper></Paper>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i} id={i} onClick={(e) => {marcaColor(e)}} style={{color:colores[i]}} >XXXX</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+20} id={i+20} onClick={(e) => {marcaColor(e)}} style={{color:colores[i+20]}} >XXXX</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+40} id={i+40} onClick={(e) => {marcaColor(e)}} style={{color:colores[i+40]}} >XXXX</Button>
            </Grid>
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+60} id={i+60} onClick={(e) => {marcaColor(e)}} style={{color:colores[i+60]}} >XXXX</Button>
            </Grid> 
            <Grid xs="2" item>
              <Button className={classes.secondPaper} key={i+80} id={i+80} onClick={(e) => {marcaColor(e)}} style={{color:colores[i+80]}} >XXXX</Button>
            </Grid> 
            <Grid xs="1" item>
              <Paper></Paper>
            </Grid>     
          </Grid>
      )
    }
  )

  //Esto se encarga de llenar la página de Palabras-Colores con los valores correpsondientes

  let llenarPalabrasColores = palabrasCut.map( (value,i) => {
    return(
      <Grid container item xs="auto" spacing={3}>
          <Grid xs="1" item>
            <Paper></Paper>
          </Grid>
          <Grid xs="2" item>
            <Button className={classes.secondPaper} key={i} id={i} onClick={(e) => {marcaPalabraColor(e)}} style={{color:colores[i]}} >{palabras[i]}</Button>
          </Grid>
          <Grid xs="2" item>
            <Button className={classes.secondPaper} key={i+20} id={i+20} onClick={(e) => {marcaPalabraColor(e)}} style={{color:colores[i+20]}} >{palabras[i+20]}</Button>
          </Grid>
          <Grid xs="2" item>
            <Button className={classes.secondPaper} key={i+40} id={i+40} onClick={(e) => {marcaPalabraColor(e)}} style={{color:colores[i+40]}} >{palabras[i+40]}</Button>
          </Grid>
          <Grid xs="2" item>
            <Button className={classes.secondPaper} key={i+60} id={i+60} onClick={(e) => {marcaPalabraColor(e)}} style={{color:colores[i+60]}} >{palabras[i+60]}</Button>
          </Grid> 
          <Grid xs="2" item>
            <Button className={classes.secondPaper} key={i+80} id={i+80} onClick={(e) => {marcaPalabraColor(e)}} style={{color:colores[i+80]}}>{palabras[i+80]}</Button>
          </Grid> 
          <Grid xs="1" item>
            <Paper></Paper>
          </Grid>     
        </Grid>
    )
  }
)

  //Función para mostrar el resultado de la prueba
  function resultados(){

    return(
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Número de items en palabras (P): {palabraIndex}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Número de items en colores (C): {colorIndex}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Numero de items en palabras-colores (PC): {palabraColorIndex}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            PC': {PC2.toFixed(3)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Interferencia: {interferencia.toFixed(3)}
          </Typography>
        </CardContent>
        <CardActions>
        <Link to={'/home'}>
          <CustomButton
            msj="Listo"
            >
          </CustomButton>
        </Link>
        
        </CardActions>
      </Card>
    )
  }

  //Función para mostrar las instrucciones de la prueba
  function instrucciones(){

    let instruc = ""
    let enunc = ""

    switch(subPage){
      case 'confirmacionP':
        instruc = " Palabras";
        enunc = " Palabra"
        break;
      case 'confirmacionC':
        instruc = " Colores";
        enunc = " Color con que esta escrita la palabra";
        break;
      case 'confirmacionPC':
        instruc = " Palabras-Colores";
        enunc = " Color con que esta escrita la palabra";
        break;
      default:
        instruc = "";
        break;
    }

    return(
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            Prueba {instruc}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Para la realización de esta prueba se deben leer los items desde la primera fila hacia abajo
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Debes pronunciar {enunc} 
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Si se comete un error debes repetir el enuncuiado hasta decirlo correctamente
          </Typography>
        </CardContent>
        <CardActions>
          <CustomButton
            msj="Siguiente"
            callback={change}>
          </CustomButton>
        </CardActions>
      </Card>
    )
  }

  function calcularResultados(){
    
    let pc2 = (palabraIndex*colorIndex)/(palabraIndex+colorIndex)
    let interf = Number(palabraColorIndex) - pc2;

    setPC2(pc2)
    setInterferencia(interf)
  }    

  //Esta función cambiará la variable que controla lo que se muestra en la pagina
  function change(){
    
    switch(subPage){
      case 'confirmacion':
        setSubPage('confirmacionP')
        break;
      case 'confirmacionP':
        setSubPage('aplicacionP')
        break;
      case 'aplicacionP':
        setSubPage('confirmacionC')
        break;
      case 'confirmacionC':
        setSubPage('aplicacionC')
        break;
      case 'aplicacionC':
        setSubPage('confirmacionPC')
        break;
      case 'confirmacionPC':
        setSubPage('aplicacionPC')
        break;
      case 'aplicacionPC':
        calcularResultados();
        setSubPage('resultados')
        break;
      default:
        setSubPage('confirmacion')
        break;
    }
  }

  //Esta función muestra lo que será mostrado en la pantalla
  function content(){

    switch(subPage){
      case 'confirmacion':
        return(<TestStart
          name="STROOP"
          change={change}
        ></TestStart>)
      case 'confirmacionP':
        return(
          <div>
            {instrucciones()}
          </div>
        )
      case 'aplicacionP':
        return(
          <div>
            <Grid container alignItems="center" spacing={1}>
                {llenarPalabras}
            </Grid>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
      case 'confirmacionC':
        return(
          <div>
            {instrucciones()}
          </div>
        )
      case 'aplicacionC':
        return(
          <div>
            <Grid container alignItems="center" spacing={1}>
                {llenarColores}
            </Grid>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
      case 'confirmacionPC':
        return(
          <div>
            {instrucciones()}
          </div>
        )
      case 'aplicacionPC':
        return(
          <div>
            <Grid container alignItems="center" spacing={1}>
                {llenarPalabrasColores}
            </Grid>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
      case 'resultados':
        
        return(
          <div>
            {resultados()}
          </div>
        )
      default:
        break;
    }

  }

  return (
    <div className={classes.general}>
      {content()}
    </div>
  );
}

export default Stroop ;
