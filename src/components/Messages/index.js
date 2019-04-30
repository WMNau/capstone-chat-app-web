import React from "react";
import PropTypes from "prop-types";

import Message from "./message";

import "./messages.scss";

const Messages = ({ messages }) => {
  return (
    <div className="messages">
      {messages &&
        messages.map(message => <Message key={message.id} message={message} />)}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array,
};

export default Messages;
