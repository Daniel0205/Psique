const initialState = {
    body:"Prueba de los Cinco Dígitos"
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