import { snitchMiddleware, snitchReducer } from "@faizaanceg/snitch";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { RegularAlert } from "./regular-alert";
import { AlertWithSnitch } from "./alert-with-snitch";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <React.Fragment>
      <AlertWithSnitch />
      <RegularAlert />
    </React.Fragment>
  </Provider>
);

render(<App />, document.getElementById("root"));
