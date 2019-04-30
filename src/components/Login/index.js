import React, { Component } from "react";

import { Container, Jumbotron, Form, Button } from "react-bootstrap";
import "./login.scss";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    const { email, password, errors } = this.state;
    return (
      <Container className="login">
        <Jumbotron>
          <h1 className="mb-4">Login</h1>
          <Form onSubmit={this.onSubmit}>
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
              name="password"
              type="password"
              placeholder="Enter your password..."
              value={password}
              error={errors.password}
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
              Login
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default Login;
