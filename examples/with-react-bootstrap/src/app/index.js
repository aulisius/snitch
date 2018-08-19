import React from "react";
import { connect } from "react-redux";
import { actions } from "../modal/redux";
function App(props) {
  return <button onClick={props.showModal}>Click to open modal! </button>;
}

export default connect(
  null,
  actions
)(App);
