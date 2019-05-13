import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Container, Form, Button } from "react-bootstrap";
import "./profile.scss";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { validateEmail, validateFirebase } from "./validate.emailChange";

import { updateEmail } from "../../store/actions/auth.action";

class EditEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      confirmEmail: "",
      password: "",
      errors: {},
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    authError: PropTypes.object,
    updateEmailSuccess: PropTypes.bool.isRequired,
    user: PropTypes.object,
    updateEmail: PropTypes.func.isRequired,
  };

  componentWillReceiveProps = nextProps => {
    // When a database error occurs, it is passed to the errors state and displayed to the user
    if (nextProps.authError) this.setFirebaseError(nextProps.authError);
  };

  setFirebaseError = error => {
    const { isValid, errors } = validateFirebase({ error });
    if (!isValid) this.setState({ errors });
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { errors, isValid } = validateEmail({
      state: this.state,
      user: this.props.user,
    });
    if (!isValid) {
      this.setState({ errors });
    } else
      this.props.updateEmail(
        this.state.email.trim().toLowerCase(),
        this.state.password.trim()
      );
  };

  render() {
    const { user, updateEmailSuccess } = this.props;
    if (updateEmailSuccess) {
      this.props.history.goBack();
      return null;
    }
    if (!user) return <p>Loading...</p>;
    const { email, confirmEmail, password, errors } = this.state;

    return (
      <Container className="edit-email">
        <h1>Edit Email Address: {user.email}</h1>
        <Form onSubmit={this.onSubmit}>
          <FormField
            name="email"
            type="text"
            placeholder="Enter your new email address..."
            value={email}
            error={errors.email}
            prepend={<FontAwesomeIcon icon="envelope" />}
            onChange={this.onTextChanged}
          />

          <FormField
            name="confirmEmail"
            type="text"
            placeholder="Confirm your new email address..."
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

          <Button variant="success" type="submit" block>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state, passedParams) => {
  const { uid } = passedParams.match.params;
  const { firebase } = state;
  const { auth, data } = firebase;
  const { users } = data;
  let user = null;
  if (users && auth.uid === uid) user = users[uid];
  return {
    auth,
    authError: state.auth.authError,
    updateEmailSuccess: state.auth.updateEmailSuccess,
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmail: (email, password) => dispatch(updateEmail(email, password)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(["users"])
  )(EditEmail)
);
