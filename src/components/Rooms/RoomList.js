import React from "react";
import PropTypes from "prop-types";

import { NavDropdown } from "react-bootstrap";

const RoomList = ({ room, onSelected }) => {
  let name = `#${room.name}`;
  if (room.name === "Add Room") name = room.name;
  return (
    <NavDropdown.Item onClick={() => onSelected(room)}>{name}</NavDropdown.Item>
  );
};

RoomList.propTypes = {
  room: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export default RoomList;
