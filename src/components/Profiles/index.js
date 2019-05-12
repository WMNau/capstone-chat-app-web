import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Container } from "react-bootstrap";

import "./profiles.scss";

import ProfileList from "./Profile.list";

class Profiles extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object,
  };

  onUserSelected = user => {
    this.props.history.push(`/user/${user.uid}`);
  };

  render() {
    const { users, auth } = this.props;
    return (
      <Container>
        <h1 className="text-center my-4">Users</h1>
        <div className="profiles">
          {auth && users ? (
            Object.values(users).map(user => {
              if (auth.uid !== user.uid)
                return (
                  <ProfileList
                    key={user.uid}
                    user={user}
                    onSelected={this.onUserSelected}
                  />
                );
              else return null;
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { firebase } = state;
  const { auth, data } = firebase;
  const { users } = data;
  return {
    auth,
    users,
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      null
    ),
    firebaseConnect([`latestMessages`, "users"])
  )(Profiles)
);
