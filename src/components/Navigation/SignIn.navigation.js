import React from "react";

import { Nav } from "react-bootstrap";

const SignIn = () => {
  return (
    <React.Fragment>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </React.Fragment>
  );
};

export default SignIn;
