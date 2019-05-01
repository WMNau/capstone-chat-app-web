import React, { Component } from "react";

import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

import "./profiles.scss";

import Users from "../Users";

class Profiles extends Component {
  onUserSelected = user => {
    console.log("User selected:", user);
    this.props.history.push(`${ROUTES.PROFILE}${user.uid}`);
  };

  render() {
    return (
      <div className="profiles">
        <Users onSelected={this.onUserSelected} />
      </div>
    );
  }
}

export default withFirebase(Profiles);
