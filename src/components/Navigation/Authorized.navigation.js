import React from "react";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import Rooms from "../Rooms";

const Authorized = ({ logout, uid }) => (
  <React.Fragment>
    <Rooms />
    <Nav.Link href={"/latest_messages"}>Private message</Nav.Link>
    <Nav.Link href={"/users"}>Search users</Nav.Link>
    <Nav.Link href={`/user/${uid}`}>View your profile</Nav.Link>
    <Nav.Link href="/" onClick={logout}>
      Logout
    </Nav.Link>
  </React.Fragment>
);

Authorized.propTypes = {
  logout: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default Authorized;
