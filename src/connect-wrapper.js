import { connect } from "react-redux";
export let connectWrapper = (Component, reducerKey) =>
  connect(state => ({
    visibilityById: state[reducerKey].visibilityById
  }))(Component);
