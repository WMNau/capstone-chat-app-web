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
        <div className="user">
          <Image src={profileImage} roundedCircle className="mr-4" />
          <h4>{user.fullName}</h4>
        </div>
      </Card.Body>
    </Card>
  );
};

UserList.propTypes = {
  user: PropTypes.object,
  onSelected: PropTypes.func.isRequired,
};

export default UserList;
