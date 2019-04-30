import React from "react";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

const PopUp = ({ title, body, shouldShow, handleClose }) => (
  <Modal show={shouldShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
);

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  shouldShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PopUp;
