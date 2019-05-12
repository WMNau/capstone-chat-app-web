import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { Row, Col, ListGroup, Image } from "react-bootstrap";

import defaultProfile from "../common/default_profile.png";

const Message = ({ message, fromUser, toUser, uid }) => {
  const direction = toUser.uid === uid ? "to" : "from";
  const profileImage =
    fromUser.profileImage === "" ? defaultProfile : fromUser.profileImage;
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

Message.propTypes = {
  message: PropTypes.object.isRequired,
  fromUser: PropTypes.object.isRequired,
  toUser: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
};

export default Message;
