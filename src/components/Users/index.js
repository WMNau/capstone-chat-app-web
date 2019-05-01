import React, { Component } from "react";
import PropTypes from "prop-types";

import { withFirebase } from "../Firebase";

import { Container } from "react-bootstrap";
import "./users.scss";

import UserList from "./List.user";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      currentUid: "",
    };
  }

  static propTypes = {
    onSelected: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const id = this.props.firebase.uid();
      const userObject = snapshot.val();
      const users = Object.keys(userObject).map(key => ({
        ...userObject[key],
        uid: key,
      }));
      this.setState({ users, loading: false, currentUid: id });
    });
  };

  componentWillUnmount = () => {
    this.props.firebase.users().off();
  };

  render() {
    const { users, loading, currentUid } = this.state;

    return (
      <div className="users">
        <Container>
          <h1 className="text-center my-4">Users</h1>
          {loading && <div>Loading...</div>}
          {users.map(user => {
            if (currentUid !== user.uid) {
              return (
                <UserList
                  key={user.uid}
                  user={user}
                  onSelected={this.props.onSelected}
                />
              );
            } else {
              return null;
            }
          })}
        </Container>
      </div>
    );
  }
}

export default withFirebase(Users);
