import { snitchMiddleware, snitchReducer } from "@faizaanceg/snitch";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import Button from "./app";
import { MyModal } from "./modal";
const middleware = [snitchMiddleware("modals"), logger];

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
      <Button />
      <MyModal />
    </React.Fragment>
  </Provider>
);

render(<App />, document.getElementById("root"));
