import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

import PropTypes from "prop-types";

import "./navigation.scss";

import SignIn from "./SignIn.navigation";
import Authorized from "./Authorized.navigation";

import { logout } from "../../store/actions/auth.action";

class Navigation extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  handleLogout = () => {
    this.props.logout();
  };

  getNavigationLinks = () => {
    if (this.props.auth.uid)
      return (
        <Authorized logout={this.handleLogout} uid={this.props.auth.uid} />
      );
    else return <SignIn />;
  };

  render() {
    return (
      <div className="navigation">
        <Navbar bg="dark" className="navbar-dark" expand="lg">
          <Navbar.Brand href="#home">Capstone Chat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">{this.getNavigationLinks()}</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
