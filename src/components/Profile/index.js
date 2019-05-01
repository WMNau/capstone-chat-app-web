import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";
import defaultProfile from "../common/default_profile.png";

import { Image, Button } from "react-bootstrap";
import "./profile.scss";

const INITIAL_STATE = {
  profileImage: defaultProfile,
  user: {},
  loading: false,
  isCurrentUser: false,
};

class Profile extends Component {
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
    firebase.user(id).on("value", snapshot => {
      const user = snapshot.val();
      this.setState({
        profileImage:
          user.profileImage === "" ? defaultProfile : user.profileImage,
        user,
        loading: false,
        isCurrentUser: firebase.uid() === user.uid,
      });
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.users().off();
  };

  onEditSelected = e => {
    this.setState({ ...INITIAL_STATE });
    this.props.history.push(`${ROUTES.EDIT}${this.state.user.uid}`);
  };

  onMessageSelected = e => {
    console.log("message");
  };

  render() {
    const { profileImage, user, loading, isCurrentUser } = this.state;

    return (
      <div className="profile mt-4">
        {loading && <div>Loading...</div>}
        <h1 className="text-center">Profile</h1>
        <div className="profile-info">
          <Image src={profileImage} roundedCircle className="my-4 mr-4" />
          <h2>{user.fullName}</h2>
          <p className="text-muted">Email: {user.email}</p>
          <p className="text-muted mb-4">
            Bio: {user.bio === "" ? "None" : user.bio}
          </p>
          {isCurrentUser ? (
            <Button
              variant="info"
              size="lg"
              block
              onClick={this.onEditSelected}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              block
              onClick={this.onMessageSelected}
            >
              Message
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withFirebase(Profile);
