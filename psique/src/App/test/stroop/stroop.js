import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TestStart from '../../components/testStart';
import CustomButton from '../../components/customButton';

import Paper from '@material-ui/core/Paper';


const useStyles =  makeStyles({
  general: {
    textAlign: "center",
  },
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
    marginBottom: '5%'
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  block: {  
    display: "block"
  },
});

function Stroop() {
  const classes = useStyles();

  const [subPage,setSubPage] = useState("confirmacion")

  //Esta función cambiará la variable que controla lo que se muestra en la pagina
  function change(test){
    
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
            <h4>Iniciar la prueba palabras</h4>
            <CustomButton
              msj="Iniciar palabras"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'aplicacionP':
        return(
          <div>
            <h4>Estas en la prueba palabras</h4>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'confirmacionC':
        return(
          <div>
            <h4>Iniciar la prueba colores</h4>
            <CustomButton
              msj="Iniciar colores"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'aplicacionC':
        return(
          <div>
            <h4>Estas en la prueba colores</h4>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'confirmacionPC':
        return(
          <div>
            <h4>Iniciar la prueba palabras-colores</h4>
            <CustomButton
              msj="Iniciar palabras-colores"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'aplicacionPC':
        return(
          <div>
            <h4>Estas en la prueba palabras-colores</h4>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
      case 'resultados':
        return(
          <div>
            <h4>Estas en la revisión de resultados</h4>
            <CustomButton
              msj="Siguiente"
              callback={change}>
            </CustomButton>
          </div>
        )
        break;
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
