import React from "react";
import PropTypes from "prop-types";

import { Image, Card } from "react-bootstrap";

import defaultProfile from "../common/default_profile.png";

const UserList = ({ user, onSelected }) => {
  const profileImage =
    user.profileImage === "" ? defaultProfile : user.profileImage;
  return (
    <Card className="mt-4" onClick={() => onSelected(user)}>
      <Card.Body>
        <Image src={profileImage} roundedCircle className="mr-4" />
        <span>{user.fullName}</span>
      </Card.Body>
    </Card>
  );
};

UserList.propTypes = {
  user: PropTypes.object,
  onSelected: PropTypes.func.isRequired,
};

export default UserList;
