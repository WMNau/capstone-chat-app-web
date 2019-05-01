import React from "react";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

import { Nav } from "react-bootstrap";

const Authorized = ({ authUser, firebase }) => (
  <React.Fragment>
    <Nav.Link href={`${ROUTES.PROFILE}${authUser.uid}`}>
      View your profile
    </Nav.Link>
    <Nav.Link href={ROUTES.CHAT}>Chat</Nav.Link>
    <Nav.Link href={ROUTES.PM}>Private message</Nav.Link>
    <Nav.Link href={ROUTES.PROFILES}>Search users</Nav.Link>
    <Nav.Link
      href="/login"
      onClick={e => {
        firebase.logout();
      }}
    >
      Logout
    </Nav.Link>
  </React.Fragment>
);

export default withFirebase(Authorized);
