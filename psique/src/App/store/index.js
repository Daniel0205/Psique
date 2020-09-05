import { createStore, combineReducers, compose } from "redux";
import bodyReducer from "./body/reducer";
import patientReducer from "./patient/reducer";
import wechslerReducer from "./wechsler/reducer";
import assessmentReducer from "./assessment/reducer";
import doctorReducer from "./doctor/reducer";

const reducers = combineReducers({
    bodyReducer,
    patientReducer,
    wechslerReducer,
    bodyReducer,
    assessmentReducer,
    doctorReducer
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;