import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import defaultImage from "../common/default_profile.png";

import { Card, Image } from "react-bootstrap";

const LatestMessage = ({ message, users, onSelected }) => {
  let profileImage = defaultImage;
  const toUser = users.toUser;
  const fromUser = users.fromUser;
  if (toUser)
    profileImage =
      toUser.profileImage === "" ? defaultImage : toUser.profileImage;
  if (message) {
    return (
      <div className="latest-message" key={message.id}>
        <Card onClick={() => onSelected(toUser.uid)}>
          <Card.Header>
            <Image
              className="message-img mr-4"
              src={profileImage}
              roundedCircle
            />
            {toUser && <h2>{toUser.fullName}</h2>}
            <small className="text-muted ml-auto">
              {moment(message.sentAt).format("LLL")}
            </small>
          </Card.Header>
          <Card.Body>
            {fromUser && (
              <p className="message-text mx-4">{`${fromUser.fullName}: ${
                message.text
              }`}</p>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  } else return null;
};

LatestMessage.propTypes = {
  message: PropTypes.object,
  users: PropTypes.object,
};

export default LatestMessage;
