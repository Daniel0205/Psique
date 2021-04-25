const initialState = {
    id_patient:12,
    dataPatient:{}
  };
  
  function consultationReducer(state = initialState, action) {
    if (action.type === "SET_ID") {
      return Object.assign({}, state, {
          id_patient: action.payload
      });
    } else if(action.type === "SET_DATA"){
        return Object.assign({}, state, {
            dataPatient: action.payload
        });
    }
    return state;
  }
  
  export default consultationReducer;