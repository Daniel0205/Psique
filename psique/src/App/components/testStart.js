import React from 'react';
import CustomButton from './customButton'


function TestStart(props) {

 
  return (   
    <div id='iniciowais' >
        <h1>{props.name}</h1> <br/>
        <p>Vas a aplicar la prueba de {props.name} al paciente:</p>
        <p>Nombre Genérico</p>
        <p>Que tiene una edad de: </p> 
        <p>X años y W meses</p> <br/>

        <CustomButton
            msj="Empezar"
            callback={props.change}
        ></CustomButton>

    </div>
  );
}

export default TestStart;
