import React from "react";
import Snitch from "../snitch";

class SnitchExample extends React.Component {
  render() {
    return (
      <Snitch
        render={({ show, open, close }) =>
          show ? (
            <React.Fragment>
              Hello from this side! <button onClick={close}>Hide this!</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Hello from that side! <button onClick={open}>Show that!</button>
            </React.Fragment>
          )
        }
      />
    );
  }
}

export default SnitchExample;
