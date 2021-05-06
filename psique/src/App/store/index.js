import { createStore, combineReducers, compose } from "redux";
import bodyReducer from "./body/reducer";
import patientReducer from "./patient/reducer";
import wechslerReducer from "./wechsler/reducer";
import assessmentReducer from "./assessment/reducer";
import doctorReducer from "./doctor/reducer";
import consultationReducer from "./consultation/reducer";
import researchReducer from "./research/reducer";

const reducers = combineReducers({
    patientReducer,
    wechslerReducer,
    bodyReducer,
    assessmentReducer,
    doctorReducer,
    consultationReducer,
    researchReducer
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;