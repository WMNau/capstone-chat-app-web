import React from "react";

import { withFirebase } from "../Firebase";

import { Nav } from "react-bootstrap";

const Authorized = ({ firebase }) => {
  return (
    <React.Fragment>
      <Nav.Link href="/chat">Chat</Nav.Link>
      <Nav.Link href="/messages">Private message</Nav.Link>
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
};

export default withFirebase(Authorized);
