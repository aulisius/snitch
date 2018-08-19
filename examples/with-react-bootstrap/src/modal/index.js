import React from "react";
import { Modal } from "react-bootstrap";
import Snitch from "../snitch";
import { actionTypes } from "./redux";

export class MyModal extends React.Component {
  render() {
    return (
      <Snitch
        opensOn={actionTypes.OPEN_MODAL}
        render={({ show, onHide }) =>
          show ? (
            <Modal show={show} onHide={onHide}>
              <Modal.Body>Yo, this modal is open now!</Modal.Body>
            </Modal>
          ) : null
        }
      />
    );
  }
}
