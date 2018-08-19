import { snitchMiddleware, snitchReducer } from "@faizaanceg/snitch";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import SnitchExample from "./snitch-example";
const middleware = [snitchMiddleware("modals")];

const mainReducer = combineReducers({
  modals: snitchReducer
});

const createAppStore = (initialState = {}) =>
  createStore(
    mainReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );

const store = createAppStore({});

const App = () => (
  <Provider store={store}>
    <SnitchExample />
  </Provider>
);

render(<App />, document.getElementById("root"));
