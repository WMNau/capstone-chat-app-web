import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "../../common/FormField";

import RoomItem from "./list";

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rooms: [],
      count: 0,
      isToggled: false,
      errors: {},
    };
  }

  static propTypes = {
    setRoom: PropTypes.func.isRequired,
  };

  componentWillMount = () => {
    this.setState(state => {
      const rooms = state.rooms.push({
        id: state.count,
        name: "General",
        isSelected: false,
      });
      return {
        ...rooms,
        count: state.count + 1,
      };
    });
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.name) {
      this.setState(state => {
        const rooms = state.rooms.push({
          id: state.count,
          name: state.name,
          isSelected: false,
        });
        return {
          name: "",
          ...rooms,
          count: state.count + 1,
        };
      });
    }
    this.toggleInput(e);
  };

  toggleInput = e => {
    e.preventDefault();
    const buttonElement = document.getElementById("toggle-button");
    const formElement = document.getElementById("input");
    if (this.state.isToggled) {
      buttonElement.style.display = "block";
      formElement.style.display = "none";
    } else {
      buttonElement.style.display = "none";
      formElement.style.display = "block";
    }
    this.setState({ isToggled: !this.state.isToggled });
  };

  onSelected = e => {
    const id = e.target.id;
    this.state.rooms.forEach(room => {
      if (id.toString() === room.id.toString()) this.props.setRoom(room);
    });
  };

  setRooms = () => {
    const { rooms } = this.state;
    if (rooms)
      return rooms.map(rm => (
        <RoomItem key={rm.id} room={rm} onSelected={this.onSelected} />
      ));
  };

  render() {
    const { name, errors } = this.state;

    return (
      <div className="room">
        <h1>Room</h1>
        {this.setRooms()}
        <div className="add-room">
          <Button id="toggle-button" variant="link" onClick={this.toggleInput}>
            <FontAwesomeIcon icon="plus" /> Add a room
          </Button>
          <Form id="input" onSubmit={this.onSubmit}>
            <FormField
              name="name"
              type="text"
              placeholder="Enter a new room name..."
              value={name}
              error={errors.name}
              onChange={this.onTextChanged}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Room;
