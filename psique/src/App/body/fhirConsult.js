import React from 'react';
import Button from '@material-ui/core/Button';

import { setBody } from "../store/body/action";
import { connect } from "react-redux";

import FhirProcedure from './fhirProcedure.js';
import FhirPatient from './fhirPatient.js';


function FhirConsult(props) {

  const [byPatient, setByPatient] = React.useState(false)
  const [byProcedure, setByProcedure] = React.useState(false)

  function clickPatient(){
      setByProcedure(false);
      setByPatient(true);
  }

  function clickProcedure(){
    setByPatient(false);
    setByProcedure(true);
}


function onPatient(){
    if(byPatient){
        return(
            <div>
                <FhirPatient></FhirPatient>
            </div>
        )
    }
}

function onProcedure(){
    if(byProcedure){
        return(
            <div>
                <FhirProcedure></FhirProcedure>
            </div>
        )
    }
}

return(
    <div>
        <Button onClick={clickPatient} color="primary">
            Pacientes
        </Button>

        <Button onClick={clickProcedure} color="primary">
            Procedimientos
        </Button>

        {onPatient()}

        {onProcedure()}


    </div>
)

  
}

const mapStateToProps = (state) => {
  
    return {
      id_patient: state.consultationReducer.id_patient,
      id_doctor: state.doctorReducer.id_doctor,
      dataPatient: state.consultationReducer.dataPatient,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      setBody: (item) => dispatch(setBody(item)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (FhirConsult);