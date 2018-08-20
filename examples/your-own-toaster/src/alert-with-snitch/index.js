import React from "react";
import Snitch from "../snitch";
import { Alert, Button } from "reactstrap";

export class AlertWithSnitch extends React.Component {
  render() {
    return (
      <Snitch
        render={({ show, openView, closeView }) =>
          show ? (
            <Alert color="danger" isOpen={show} toggle={closeView}>
              <h4>Oh snap! You got an error!</h4>
              <p>
                This alert is written with Snitch! As you can see, there is no
                need for you to maintain any sort of state.
              </p>
              <p>
                <Button color="danger" onClick={closeView}>
                  Take this action
                </Button>
                <span> or </span>
                <Button color="primary" onClick={closeView}>
                  Hide Alert
                </Button>
              </p>
            </Alert>
          ) : (
            <Button color="primary" onClick={openView}>
              Show Alert with Snitch
            </Button>
          )
        }
      />
    );
  }
}
