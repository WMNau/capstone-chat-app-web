import React from "react";
import PropTypes from "prop-types";

import defaultImage from "../common/default_profile.png";

import { Image } from "react-bootstrap";

const Message = ({ message }) => {
  if (message) {
    const messageTo = message.toId ? "to" : "from";
    return (
      <div className="message" key={message.id}>
        <div className={`${messageTo}`}>
          <Image className="message-img" src={defaultImage} roundedCircle />
          <p className="message-text mx-4">{`${message.fullName}: ${
            message.text
          }`}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

Message.propTypes = {
  message: PropTypes.object,
};

export default Message;
