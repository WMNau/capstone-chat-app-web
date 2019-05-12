import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import LatestMessage from "./LatestMessage";

import "./messages.scss";

const INITIAL_STATE = {
  latestMessages: {},
  users: {},
};

class PrivateMessages extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    latestMessages: PropTypes.object,
    users: PropTypes.object,
  };

  componentDidMount = () => {
    if (this.props.latestMessages) this.setState(this.props.latestMessages);
    if (this.props.users) this.setState(this.props.users);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.latestMessages)
      this.setState({ latestMessages: nextProps.latestMessages });
    if (nextProps.latestMessages) this.setState({ users: nextProps.users });
  };

  onMessageSelected = toUid => {
    this.props.history.push(`messages/${this.props.auth.uid}/${toUid}`);
  };

  getUsers = (fromUid, toUid) => {
    const { users } = this.state;
    const results = {};
    Object.keys(users).forEach(key => {
      if (key === this.props.auth.uid) results.fromUser = users[key];
      else if (key === fromUid || key === toUid) results.toUser = users[key];
    });
    return results;
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/" />;
    const { latestMessages, users } = this.state;
    return (
      <div className="private-messages">
        {latestMessages &&
          users &&
          Object.keys(latestMessages).map(key => (
            <LatestMessage
              key={latestMessages[key].fromUid}
              message={latestMessages[key]}
              users={this.getUsers(
                latestMessages[key].fromUid,
                latestMessages[key].toUid
              )}
              onSelected={this.onMessageSelected}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { firebase } = state;
  const { auth, data } = firebase;
  const messages = data.latestMessages;
  let latestMessages;
  if (auth && messages)
    Object.keys(messages).forEach(key => {
      if (key === auth.uid) latestMessages = messages[key];
    });
  return {
    auth,
    latestMessages,
    users: data.users,
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      null
    ),
    firebaseConnect([`latestMessages`, "users"])
  )(PrivateMessages)
);
