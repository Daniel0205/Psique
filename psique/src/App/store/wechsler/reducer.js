const initialState = {
    resWechsler: {}
  };
  
  function wechslerReducer(state = initialState, action) {
    if (action.type === "SET_RESWECHSLER") {
        return Object.assign({}, state, {
            resWechsler:{
                ...state.resWechsler,
                [action.payloadName]: action.payloadValue
            } 
        });
    }else if(action.type === "RESET_RESWECHSLER"){
        return Object.assign({}, state, {
            resWechsler:{} 
        });
    }
    return state;
  }
  
  export default wechslerReducer;