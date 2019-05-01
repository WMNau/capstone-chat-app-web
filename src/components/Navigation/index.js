import React from "react";

import { AuthUserContext } from "../Session";

import { Navbar, Nav } from "react-bootstrap";
import "./navigation.scss";

import SignIn from "./SignIn.navigation";
import Authorized from "./Authorized.navigation";

const getNavigationLinks = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <Authorized authUser={authUser} /> : <SignIn />)}
  </AuthUserContext.Consumer>
);

const Navigation = () => (
  <div className="navigation">
    <Navbar bg="dark" className="navbar-dark" expand="lg">
      <Navbar.Brand href="#home">Capstone Chat</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">{getNavigationLinks()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Navigation;
