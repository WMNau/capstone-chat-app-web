import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { NavDropdown, Modal, Button, Form } from "react-bootstrap";

import FormField from "../common/FormField";

import RoomList from "./RoomList";

import { addRoom } from "../../store/actions/rooms.action";

const INITIAL_STATE = {
  showModal: false,
  name: "",
  errors: {},
};

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object,
    addRoom: PropTypes.func.isRequired,
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRoomSelected = room => {
    if (room.name === "Add Room") this.handleShow();
    else this.props.history.push(`/room/${room.name.toLowerCase()}`);
  };

  handleClose = () => {
    this.setState({ ...INITIAL_STATE });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  saveRoom = e => {
    e.preventDefault();
    const { name } = this.state;
    const { rooms } = this.props;
    const errors = {};
    if (name === "") {
      errors.name =
        "You did not enter a room name. Chose cancel if you wish to quit without providing a room name.";
      this.setState({ errors });
    } else {
      if (rooms)
        Object.keys(rooms).forEach(key => {
          if (key === name.toLowerCase())
            return (errors.name = `${name} already exists. Please choose another room name or cancel and choose to enter that room.`);
        });
      if (errors.name) this.setState({ errors });
      else {
        this.props.addRoom(name);
        this.handleClose();
        this.props.history.push(`/room/${name.toLowerCase()}`);
      }
    }
  };

  modal = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a room...</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.saveRoom}>
          <Modal.Body>
            <FormField
              name="name"
              type="text"
              placeholder="Enter a room name..."
              value={this.state.name}
              error={this.state.errors.name}
              onChange={this.onTextChanged}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  render() {
    const { rooms } = this.props;
    const passedRooms = {
      addRoom: { name: "Add Room" },
      ...rooms,
    };

    return (
      <NavDropdown title="Chat Rooms" id="room-dropdown">
        {passedRooms &&
          Object.keys(passedRooms).map(key => {
            return (
              <RoomList
                key={key}
                room={passedRooms[key]}
                onSelected={this.onRoomSelected}
              />
            );
          })}
        {this.modal()}
      </NavDropdown>
    );
  }
}

const mapStateToProps = state => {
  const { firebase } = state;
  const { auth, data } = firebase;
  const { rooms } = data;
  return {
    auth,
    rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoom: room => dispatch(addRoom(room)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect([`rooms`])
  )(Rooms)
);
