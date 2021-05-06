const initialState = {
    research:null,
  };
  
  function researchReducer(state = initialState, action) {
    if (action.type === "SET_RESEARCH") {
      return Object.assign({}, state, {
        research: action.payload
      });
    }
    return state;
  }
  
  export default researchReducer;