import { createStore, combineReducers, compose } from "redux";
import bodyReducer from "./body/reducer";
import patientReducer from "./patient/reducer";
import wechslerReducer from "./wechsler/reducer";

const reducers = combineReducers({
    bodyReducer,
    patientReducer,
    wechslerReducer,
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;