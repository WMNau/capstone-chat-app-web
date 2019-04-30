import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import uuid from "uuid/v4";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

import { Container, Jumbotron, Form, Image, Button } from "react-bootstrap";
import "./register.scss";

import defaultProfile from "../common/default_profile.png";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { validateRegister, validateFirebase } from "./validate.register";
import isEmpty from "../../utils/isEmpty";

const Register = () => {
  return (
    <Container className="register">
      <Jumbotron>
        <h1 className="mb-4">Register</h1>
        <RegisterForm />
        <p className="mt-3 text-muted">
          Already have an account? <Link to={ROUTES.LOGIN}> Login</Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

const INITIAL_STATE = {
  avatar: "",
  profileImage: defaultProfile,
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

class RegisterFormBase extends Component {
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
      firstName: "Mike",
      lastName: "Nau",
      email: "mikenau75@gmail.com",
      confirmEmail: "mikenau75@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    });
  };

  getAvatar = e => {
    const allowedExtension = ["jpeg", "jpg", "png", "gif", "bmp", "heic"];
    const file = e.target.files[0];
    let isValidExtension = false;
    for (let extension of allowedExtension) {
      if (file.type.includes(extension)) {
        isValidExtension = true;
        break;
      }
    }
    if (isValidExtension) {
      if (this.state.avatar) URL.revokeObjectURL(this.state.avatar);
      this.setState({ avatar: file, profileImage: URL.createObjectURL(file) });
    } else {
      alert("Not a valid image file.");
    }
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    if (this.isValid()) this.register();
  };

  isValid = () => {
    const { isValid, errors } = validateRegister({ state: this.state });
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  register = () => {
    const { avatar, profileImage, email, password } = this.state;
    let user = null;
    let uploadTask = null;
    const { firebase } = this.props;
    firebase
      .signUp(email, password)
      .then(authUser => {
        user = authUser;
        if (profileImage === defaultProfile) return null;
        return (uploadTask = firebase.storageRef(uuid()).put(avatar));
      })
      .then(() => {
        if (uploadTask !== null) {
          return uploadTask.snapshot.ref.getDownloadURL();
        }
        return null;
      })
      .then(url => {
        return firebase
          .user(user.user.uid)
          .set(this.createUser(user.user, url));
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CHAT);
      })
      .catch(error => {
        if (user !== null) {
          firebase
            .deleteUser()
            .then(() => {
              this.setFirebaseError(error);
            })
            .catch(error => {
              this.setFirebaseError(error);
            });
        } else {
          this.setFirebaseError(error);
        }
      });
  };

  setFirebaseError = error => {
    const { isValid, errors } = validateFirebase({ error });
    if (!isValid) this.setState({ errors });
  };

  createUser = (user, url) => {
    const { firstName, lastName, email } = this.state;
    const timestamp = Date.now();
    const User = {
      bio: "",
      email: email.toLowerCase(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      profileImage: url ? url : "",
      timestamp,
      uid: user.uid,
      updatedAt: timestamp,
    };
    return User;
  };

  render() {
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
    );
  }
}

export default Register;

const RegisterForm = compose(
  withRouter,
  withFirebase
)(RegisterFormBase);

export { RegisterForm };
