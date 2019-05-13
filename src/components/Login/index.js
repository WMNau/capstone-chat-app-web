import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Container, Jumbotron, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./login.scss";

import FormField from "../common/FormField";

import { validateLogin, validateFirebase } from "./validate.login";
import isEmpty from "../../utils/isEmpty";

import Modal from "../common/Modal";

import {
  login,
  requestPasswordResetEmail,
} from "../../store/actions/auth.action";

const INITIAL_STATE = {
  email: "",
  password: "",
  showModal: false,
  isLoading: false,
  errors: {},
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    authError: PropTypes.object,
    login: PropTypes.func.isRequired,
    requestPasswordResetEmail: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = nextProps => {
    // When a database error occurs, it is passed to the errors state and displayed to the user
    if (nextProps.authError) this.setFirebaseError(nextProps.authError);
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Hides the pop-up modal
   */
  handleClose = () => {
    this.setState({ showModal: false });
  };

  /**
   * Shows the pop-up modal
   */
  handleShow = () => {
    this.setState({ showModal: true });
  };

  setLoading = isLoading => {
    this.setState({ isLoading });
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setLoading(true);
    // Reset errors to an empty object incase previous errors where fixed.
    this.setState({ errors: {} });
    const { email } = this.state;
    if (isEmpty(email)) {
      const errors = {};
      errors.email =
        "Email address is required to send you a reset password email.";
      this.setState({ errors });
    } else {
      this.handleShow();
      // Call database function to send a reset email.
      this.props.requestPasswordResetEmail(email.trim().toLowerCase());
    }
    this.setLoading(false);
  };

  onSubmit = e => {
    e.preventDefault();
    this.setLoading(true);
    this.setState({ errors: {} });
    if (this.isValid()) {
      const { email, password } = this.state;
      const credentials = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };
      this.props.login(credentials);
    }
    this.setLoading(false);
  };

  isValid = () => {
    const { isValid, errors } = validateLogin({ state: this.state });
    if (!isValid) this.setState({ errors });
    return isValid;
  };

  setFirebaseError = error => {
    this.setLoading(true);
    const { isValid, errors } = validateFirebase({ error });
    if (!isValid) this.setState({ errors });
    this.setLoading(false);
  };

  render() {
    if (this.props.auth.uid) return <Redirect to="/latest_messages" />;
    const { email, password, errors, showModal } = this.state;
    const isInvalid = isEmpty(email) || isEmpty(password);
    return (
      <Container className="login">
        {this.state.isLoading && <h6>Loading...</h6>}
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
          <p className="mt-3 text-muted">
            Need an account? <Link to="/register"> Register here</Link>
          </p>
        </Jumbotron>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials)),
    requestPasswordResetEmail: email =>
      dispatch(requestPasswordResetEmail(email)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
