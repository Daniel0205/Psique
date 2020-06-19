import React from 'react';
import CustomButton from './customButton';

import { setBody } from "../store/body/action";
import { connect } from "react-redux";

function Results(props) {

    function reviewFun(){
        props.callback("results")
      }
    
    function finishFun(){
        setBody("init")
    }

    return (
    <div id = "container" >
        <h1>Terminaste la subprueba de {props.nameTest}</h1>
        <h2>Tu resultado es: {props.result}</h2>
        
        <div id='buttons' >
            <CustomButton
            msj="Revisión de resultados"
            callback={reviewFun}
            ></CustomButton>

            <CustomButton
            msj="Terminar y guardar"
            callback={finishFun}
            ></CustomButton>  
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
  
