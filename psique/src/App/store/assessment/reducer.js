const initialState = {
    id_assessment:null
  };
  
  function assessmentReducer(state = initialState, action) {
    if (action.type === "SET_ASSESSMENT") {
      return Object.assign({}, state, {
        id_assessment: action.payload
      });
    }
    return state;
  }
  
  export default assessmentReducer;