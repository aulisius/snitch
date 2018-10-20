import React from "react";
import { Alert, Button } from "reactstrap";

export class RegularAlert extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: false
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert color="danger" isOpen={this.state.show}>
          <h4>Oh snap! You got an error!</h4>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
          <p>
            <Button color="danger">Take this action</Button>
            <span> or </span>
            <Button color="primary" onClick={this.handleDismiss}>
              Hide Alert
            </Button>
          </p>
        </Alert>
      );
    }

    return (
      <Button color="primary" onClick={this.handleShow}>
        Show Regular Alert
      </Button>
    );
  }
}
