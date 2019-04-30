import React from "react";
import PropTypes from "prop-types";

const RoomItem = ({ room, onSelected }) => {
  const selected = room.isSelected ? "selected" : "";
  if (room) {
    return (
      <div
        className={`room-item mb-1 ${selected}`}
        id={room.id}
        onClick={onSelected}
      >
        <h5 className="text-muted" id={room.id}>
          #{room.name}
        </h5>
      </div>
    );
  } else {
    return null;
  }
};

RoomItem.propTypes = {
  room: PropTypes.object,
  onSelected: PropTypes.func.isRequired,
};

export default RoomItem;
