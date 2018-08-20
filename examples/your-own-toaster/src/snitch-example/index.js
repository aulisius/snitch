import React from "react";
import Snitch from "../snitch";

class SnitchExample extends React.Component {
  render() {
    return (
      <Snitch
        render={({ show, openView, closeView }) =>
          show ? (
            <React.Fragment>
              <div>
                {" "}
                Hello from this side!{" "}
                <button onClick={closeView}>Hide this!</button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>
                Hello from that side!{" "}
                <button onClick={openView}>Show that!</button>
              </div>
            </React.Fragment>
          )
        }
      />
    );
  }
}

export default SnitchExample;
