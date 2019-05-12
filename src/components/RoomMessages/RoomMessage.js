import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { Row, Col, ListGroup, Image } from "react-bootstrap";

import defaultProfile from "../common/default_profile.png";

const RoomMessage = ({ message, user, currentUid }) => {
  const direction = user.uid === currentUid ? "from" : "to";
  const profileImage =
    user.profileImage === "" ? defaultProfile : user.profileImage;
  return (
    <ListGroup.Item className={direction}>
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
    </ListGroup.Item>
  );
};

RoomMessage.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  currentUid: PropTypes.string.isRequired,
};

export default RoomMessage;
