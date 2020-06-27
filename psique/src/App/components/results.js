import React from 'react';
import CustomButton from './customButton';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../store/body/action";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    container:{
        textAlign:"center"
    },
    buttons: {
     display:"-webkit-inline-box"
    },
  }));

function Results(props) {
    const classes = useStyles();

    function reviewFun(){
        props.callback("results")
      }
    
    function finishFun(){
        props.setBody("init")
    }

    return (
    <div className={classes.container} >
        <h1>Terminaste la subprueba de {props.name}</h1>
        <h2>Tu resultado es: {props.result}</h2>

        {props.comment===undefined ? "": props.comment }
        
        <div className={classes.buttons} >

            {props.revision===undefined ? 
            <CustomButton
            msj="Revisión de resultados"
            callback={reviewFun}
            ></CustomButton>: "" }

            <CustomButton
            msj="Terminar y guardar"
            callback={finishFun}
            ></CustomButton>  
        </div>

    </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setBody: (item) => dispatch(setBody(item)),

    };
}

export default connect(null, mapDispatchToProps)(Results);
  
