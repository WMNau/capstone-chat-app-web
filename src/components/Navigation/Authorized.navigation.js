import React from "react";

import { Nav } from "react-bootstrap";

const Authorized = () => {
  return (
    <React.Fragment>
      <Nav.Link href="/chat">Chat</Nav.Link>
      <Nav.Link href="/messages">Private message</Nav.Link>
      <Nav.Link href="/login">Logout</Nav.Link>
    </React.Fragment>
  );
};

export default Authorized;
