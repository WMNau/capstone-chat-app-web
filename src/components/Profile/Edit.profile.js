import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import defaultProfile from "../common/default_profile.png";

import { Container, Form, Image, ButtonGroup, Button } from "react-bootstrap";
import "./profile.scss";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateProfile } from "../../store/actions/user.action";

const INITIAL_STATE = {
  avatar: "",
  profileImage: defaultProfile,
  firstName: "",
  lastName: "",
  bio: "",
  errors: {},
};

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    if (this.props.user) this.populate(this.props.user);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.user) this.populate(nextProps.user);
  };

  populate = user => {
    const profileImage =
      user.profileImage === "" ? defaultProfile : user.profileImage;
    this.setState({
      profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
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
    } else alert("Not a valid image file.");
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { avatar, firstName, lastName, bio } = this.state;
    const { user } = this.props;
    const profile = {
      profileImage: avatar,
      firstName: firstName === "" ? user.firstName : firstName,
      lastName: lastName === "" ? user.lastName : lastName,
      bio,
    };
    this.props.updateProfile(user, profile);
    this.props.history.goBack();
  };

  render() {
    const { profileImage, firstName, lastName, bio, errors } = this.state;
    return (
      <Container>
        <h1 className="my-4">Edit profile</h1>
        <div className="profile">
          {this.props.user ? (
            <Form onSubmit={this.onSubmit}>
              <div className="avatar my-4">
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
                name="bio"
                type="text"
                as="textarea"
                placeholder="Share something about yourself with us..."
                value={bio}
                error={errors.bio}
                prepend={<FontAwesomeIcon icon="envelope" />}
                onChange={this.onTextChanged}
              />
              <div className="d-flex flex-column">
                <ButtonGroup size="lg">
                  <Button
                    variant="danger"
                    onClick={() => this.props.history.goBack()}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </ButtonGroup>
              </div>
            </Form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
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
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (user, profile) => dispatch(updateProfile(user, profile)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(["users"])
  )(EditProfile)
);
