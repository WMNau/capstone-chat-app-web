import React, { Component } from "react";

import { Container, Jumbotron, Form, Image, Button } from "react-bootstrap";
import "./register.scss";

import defaultProfile from "../common/default_profile.png";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
      errors,
    } = this.state;
    return (
      <Container className="register">
        <Jumbotron>
          <h1 className="mb-4">Register</h1>
          <Form onSubmit={this.onSubmit}>
            <Image
              className="profile-img mb-4"
              src={defaultProfile}
              roundedCircle
            />

            <FormField
              name="firstName"
              type="text"
              placeholder="Enter your first name..."
              value={firstName}
              error={errors.lastName}
              prepend={<FontAwesomeIcon icon="user" />}
              onChange={this.onTextChanged}
            />

            <FormField
              name="lastName"
              type="text"
              placeholder="Enter your last name..."
              value={lastName}
              error={errors.lastName}
              prepend={<FontAwesomeIcon icon="user" />}
              onChange={this.onTextChanged}
            />

            <FormField
              name="email"
              type="email"
              placeholder="Enter your email address..."
              value={email}
              info="We'll never share your email with anyone else."
              error={errors.email}
              prepend={<FontAwesomeIcon icon="envelope" />}
              onChange={this.onTextChanged}
            />

            <FormField
              name="confirmEmail"
              type="email"
              placeholder="Confirm your email address..."
              value={confirmEmail}
              error={errors.confirmEmail}
              prepend={<FontAwesomeIcon icon="envelope" />}
              onChange={this.onTextChanged}
            />

            <FormField
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={password}
              error={errors.password}
              prepend={<FontAwesomeIcon icon="lock" />}
              onChange={this.onTextChanged}
            />

            <FormField
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password..."
              value={confirmPassword}
              error={errors.confirmPassword}
              prepend={<FontAwesomeIcon icon="lock" />}
              onChange={this.onTextChanged}
            />

            <Button
              className="mt-4"
              variant="success"
              size="lg"
              block
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default Register;
