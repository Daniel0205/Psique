const initialState = {
    id_doctor:null
  };
  
  function doctorReducer(state = initialState, action) {
    if (action.type === "SET_DOCTOR") {
      return Object.assign({}, state, {
        id_doctor: action.payload
      });
    }
    return state;
  }
  
  export default doctorReducer;