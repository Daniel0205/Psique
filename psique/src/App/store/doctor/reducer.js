const initialState = {
    id_doctor:null,
    id_fhir_doctor:null
  };
  
  function doctorReducer(state = initialState, action) {
    if (action.type === "SET_DOCTOR") {
      return Object.assign({}, state, {
        id_doctor: action.payload
      });
    } else if (action.type === "SET_FHIR_DOCTOR") {
      return Object.assign({}, state, {
        id_fhir_doctor: action.payload
      });
    }
    return state;
  }
  
  export default doctorReducer;