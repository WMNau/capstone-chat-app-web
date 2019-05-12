import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Container, Jumbotron, Form, Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import defaultProfile from "../common/default_profile.png";

import "./register.scss";

import FormField from "../common/FormField";
import { validateRegister, validateFirebase } from "./validate.register";
import isEmpty from "../../utils/isEmpty";

import { register } from "../../store/actions/auth.action";

const INITIAL_STATE = {
  avatar: "",
  profileImage: defaultProfile,
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  errors: {},
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    authError: PropTypes.object,
    register: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = nextProps => {
    // When a database error occurs, it is passed to the errors state and displayed to the user
    if (nextProps.authError) this.setFirebaseError(nextProps.authError);
  };

  setLoading = isLoading => {
    this.setState({ isLoading });
  };

  getAvatar = e => {
    this.setLoading(true);
    const allowedExtension = ["jpeg", "jpg", "png", "gif", "bmp", "heic"];
    const file = e.target.files[0];
    let isValidExtension = false;
    for (let extension of allowedExtension)
      if (file.type.includes(extension)) {
        isValidExtension = true;
        break;
      }
    if (isValidExtension) {
      if (this.state.avatar) URL.revokeObjectURL(this.state.avatar);
      this.setState({ avatar: file, profileImage: URL.createObjectURL(file) });
    } else alert("Not a valid image file.");
    this.setLoading(false);
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setLoading(true);
    this.setState({ errors: {} });
    if (this.isValid()) {
      const { avatar, firstName, lastName, email, password } = this.state;
      const credentials = {
        email: email.trim().toLowerCase(),
        password,
      };
      const timestamp = Date.now();
      const profile = {
        bio: "",
        email: email.trim().toLowerCase(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        profileImage: avatar,
        timestamp,
        updatedAt: timestamp,
      };
      this.props.register(credentials, profile);
    }
    this.setLoading(false);
  };

  isValid = () => {
    const { isValid, errors } = validateRegister({ state: this.state });
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
    const {
      profileImage,
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
      errors,
    } = this.state;
    const isInvalid =
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(email) ||
      isEmpty(confirmEmail) ||
      isEmpty(password) ||
      isEmpty(confirmPassword);
    return (
      <Container className="register">
        {this.state.isLoading && <h6>Loading...</h6>}
        <Jumbotron>
          <h1 className="mb-4">Register</h1>
          <Form onSubmit={this.onSubmit}>
            <div className="avatar">
              <input
                type="file"
                onChange={this.getAvatar}
                style={{ display: "none" }}
                ref={fileInput => (this.fileInput = fileInput)}
              />
              <Image
                className="profile-img mb-4"
                src={profileImage}
                roundedCircle
                onClick={() => this.fileInput.click()}
              />
            </div>

            <FormField
              name="firstName"
              type="text"
              placeholder="Enter your first name..."
              value={firstName}
              error={errors.firstName}
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
              Register
            </Button>
          </Form>
          <p className="mt-3 text-muted">
            Already have an account? <Link to="/"> Login</Link>
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
    register: (credentials, profile) =>
      dispatch(register(credentials, profile)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
