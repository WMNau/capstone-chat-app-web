import React, { Component } from "react";
import uuid from "uuid/v4";

import { withFirebase } from "../Firebase";

import defaultProfile from "../common/default_profile.png";
import isEmpty from "../../utils/isEmpty";

import { Container, Form, Image, Button } from "react-bootstrap";
import "./profile.scss";

import FormField from "../common/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INITIAL_STATE = {
  avatar: "",
  profileImage: defaultProfile,
  firstName: "",
  lastName: "",
  bio: "",
  user: {},
  loading: false,
  errors: {},
};

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    const { firebase } = this.props;
    firebase.user().off();
    firebase.user(id).on("value", snapshot => {
      const user = snapshot.val();
      this.setState({
        profileImage:
          user.profileImage === "" ? defaultProfile : user.profileImage,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        user,
        loading: false,
        isCurrentUser: id === user.uid,
      });
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.user().off();
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
    const { avatar } = this.state;
    const { firebase } = this.props;
    if (avatar === null || avatar === undefined || avatar === "")
      this.updateUser(null);
    else {
      firebase
        .storageRef(uuid())
        .put(avatar)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => this.updateUser(url))
        .catch(err =>
          console.log(`[ ${err.name} ][ ${err.code} ]\n${err.message}`)
        );
    }
  };

  updateUser = url => {
    console.log(url);
    const { firebase } = this.props;
    const { user, firstName, lastName, bio } = this.state;
    const updatedUser = {};
    updatedUser.profileImage = isEmpty(url) ? null : url;
    updatedUser.firstName =
      user.firstName !== firstName && !isEmpty(firstName) ? null : firstName;
    updatedUser.lastName =
      user.lastName !== lastName && !isEmpty(lastName) ? null : lastName;
    if (!isEmpty(updatedUser.firstName) || !isEmpty(updatedUser.lastName)) {
      if (!isEmpty(updatedUser.firstName) && !isEmpty(updatedUser.lastName)) {
        updatedUser.fullName = `${firstName} ${lastName}`;
      } else if (!isEmpty(updatedUser.firstName)) {
        updatedUser.fullName = `${firstName} ${user.lastName}`;
      } else {
        updatedUser.fullName = `${user.firstName} ${lastName}`;
      }
    }
    if (user.bio !== bio) updatedUser.bio = isEmpty(bio) ? "" : bio;
    if (updatedUser !== {}) updatedUser.updatedAt = Date.now();
    firebase
      .updateUser(user.uid, updatedUser)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.goBack();
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      profileImage,
      firstName,
      lastName,
      bio,
      loading,
      errors,
    } = this.state;
    return (
      <Container>
        <div className="profile">
          {loading && <div>Loading...</div>}
          <h1 className="my-4">Edit profile</h1>
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

            <Button variant="primary" size="lg" type="submit" block>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default withFirebase(EditProfile);
