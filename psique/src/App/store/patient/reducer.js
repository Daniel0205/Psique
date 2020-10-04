const initialState = {
    birthday: new Date(1998,10,24),//Los meses empiezan a contar desde 0 (10 = Noviembre)
    id_patient:1234
  };
  
  function patientReducer(state = initialState, action) {
    if (action.type === "SET_BIRTHDAY") {
        return Object.assign({}, state, {
            birthday: action.payload
        });
    }
    else if (action.type === "SET_ID") {
      return Object.assign({}, state, {
          id_patient: action.payload
      });
    }
    return state;
  }
  
  export default patientReducer;