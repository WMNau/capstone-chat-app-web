import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { Row, Col, ListGroup, Image } from "react-bootstrap";

import defaultProfile from "../common/default_profile.png";

const Message = ({ message, fromUser, toUser, uid }) => {
  const direction = message.fromUid === uid ? "from" : "";
  console.log("Text:", message.text);
  console.log("Direction:", direction);
  let profileImage = defaultProfile;
  if (direction === "from")
    profileImage =
      fromUser.profileImage === "" ? defaultProfile : fromUser.profileImage;
  else
    profileImage =
      toUser.profileImage === "" ? defaultProfile : toUser.profileImage;
  return (
    <ListGroup.Item>
      <div className={direction}>
        <Row>
          <Col sm={2} className="meta">
            <Image src={profileImage} roundedCircle />
            <p>
              <small>{moment(message.timestamp).format("LLL")}</small>
            </p>
          </Col>
          <Col className="text">
            <p>{message.text}</p>
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  fromUser: PropTypes.object.isRequired,
  toUser: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
};

export default Message;
