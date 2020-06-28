const initialState = {
    body: 'WISC-registros'
  };
  
  function bodyReducer(state = initialState, action) {
    if (action.type === "SET_BODY") {
      return Object.assign({}, state, {
        body: action.payload
      });
    }
    return state;
  }
  
  export default bodyReducer;