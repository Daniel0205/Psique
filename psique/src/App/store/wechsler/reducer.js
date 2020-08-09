const initialState = {
    resWechsler: {},
    session:{
        test: 'initial',
        active: false
    },
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
    }else if(action.type === "RESET_SESSION"){
        return Object.assign({}, state, {
            session:{
                ...state.session,
                test: action.testValue,
                active: action.activeValue
            } 
        });
    }
    return state;
  }
  
  export default wechslerReducer;