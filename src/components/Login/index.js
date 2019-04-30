import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

import { Container, Jumbotron, Form, Button } from "react-bootstrap";
import "./login.scss";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { validateLogin, validateFirebase } from "./validate.login";
import isEmpty from "../../utils/isEmpty";

import Modal from "../common/Modal";

const Login = () => {
  return (
    <Container className="login">
      <Jumbotron>
        <h1 className="mb-4">Login</h1>
        <LoginForm />
        <p className="mt-3 text-muted">
          Need an account? <Link to={ROUTES.REGISTER}> Register here</Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  showModal: false,
  errors: {},
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  componentWillMount = () => {
    this.setState({
      email: "mikenau75@gmail.com",
      password: "123456",
    });
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    const { email } = this.state;
    if (isEmpty(email)) {
      const errors = {};
      errors.email =
        "Email address is required to send you a reset password email.";
      this.setState({ errors });
    } else {
      this.props.firebase
        .resetPassword(email)
        .then(() => {
          this.handleShow();
        })
        .catch(error => {
          const { isValid, errors } = validateFirebase({ error });
          if (!isValid) this.setState({ errors });
        });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    if (this.isValid()) this.login();
  };

  isValid = () => {
    const { isValid, errors } = validateLogin({ state: this.state });
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  login = () => {
    const { email, password } = this.state;
    this.props.firebase
      .login(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CHAT);
      })
      .catch(error => {
        const { isValid, errors } = validateFirebase({ error });
        if (!isValid) this.setState({ errors });
      });
  };

  render() {
    const { email, password, errors, showModal } = this.state;

    const isInvalid = isEmpty(email) || isEmpty(password);

    return (
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

        <Form.Text
          id="forgot-password"
          className="text-primary text-center"
          role="button"
          onClick={this.forgotPassword}
        >
          Forgot password?
        </Form.Text>

        {errors.database && (
          <Form.Text className="text-danger my-2">
            * {errors.database}
          </Form.Text>
        )}

        <Button
          className="mt-4"
          variant="success"
          size="lg"
          block
          type="submit"
          disabled={isInvalid}
        >
          Login
        </Button>
        <Modal
          title="PASSWORD RESET"
          body="You should receive an email soon with instructions on how to reset your password."
          shouldShow={showModal}
          handleClose={this.handleClose}
        />
      </Form>
    );
  }
}

export default Login;

const LoginForm = compose(
  withRouter,
  withFirebase
)(LoginFormBase);

export { LoginForm };
