import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import defaultProfile from "../common/default_profile.png";

import { Image, Button } from "react-bootstrap";
import "./profile.scss";
import { isEmpty } from "@firebase/util";

class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
  };

  onEditSelected = e => {
    this.props.history.push(`/user/edit/${this.state.user.uid}`);
  };

  displayButton = () => {
    if (isEmpty(this.props.user)) return null;
    else if (this.props.auth && this.props.user.uid === this.props.auth.uid)
      return (
        <NavLink to={`/user/edit/${this.props.user.uid}`}>
          <Button variant="info" size="lg" block>
            Edit
          </Button>
        </NavLink>
      );
    else
      return (
        <NavLink to={`/messages/${this.props.auth.uid}/${this.props.user.uid}`}>
          <Button variant="info" size="lg" block>
            Message
          </Button>
        </NavLink>
      );
  };

  render() {
    const { user } = this.props;
    let profileImage = defaultProfile;
    if (user && user.profileImage !== "") profileImage = user.profileImage;
    return (
      <div className="profile mt-4">
        <h1 className="text-center">Profile</h1>
        {user ? (
          <div className="profile-info">
            <Image src={profileImage} roundedCircle className="my-4 mr-4" />
            <h2>{user.fullName}</h2>
            <p className="text-muted">Email: {user.email}</p>
            <p className="text-muted mb-4">
              Bio: {user.bio === "" ? "None" : user.bio}
            </p>
            {this.displayButton()}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, passedParams) => {
  const { uid } = passedParams.match.params;
  const { firebase } = state;
  const { auth, data } = firebase;
  const { users } = data;
  let user;
  if (users) user = users[uid] ? users[uid] : [];
  return {
    auth,
    user,
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      null
    ),
    firebaseConnect(["users"])
  )(Profile)
);
