import { createStore, combineReducers, compose } from "redux";
import bodyReducer from "./body/reducer";

const reducers = combineReducers({
    bodyReducer,
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;