import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Form, ListGroup } from "react-bootstrap";

import FormField from "../common/FormField";
import Message from "./Message";

import { addMessage } from "../../store/actions/messages.action";

const INITIAL_STATE = {
  toUser: {},
  fromUser: {},
  messages: [],
  text: "",
  errors: {},
};

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    messages: PropTypes.array,
    users: PropTypes.array,
    addMessage: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { auth, messages, users } = this.props;
    if (messages.length > 0) this.setMessages(messages);
    if (auth && users) this.setUsers(auth.uid, users);
  };

  componentWillReceiveProps = nextProps => {
    const { auth, messages, users } = nextProps;
    if (messages.length > 0) this.setMessages(messages);
    if (auth && users) this.setUsers(auth.uid, users);
  };

  setMessages = messages => {
    let tempMessages = [];
    Object.keys(messages[0]).forEach(key =>
      tempMessages.push(messages[0][key])
    );
    this.setState({ messages: tempMessages });
  };

  setUsers = (uid, users) => {
    let toUser = {};
    let fromUser = {};
    users.forEach(user => {
      if (user.uid === uid) fromUser = user;
      else toUser = user;
    });
    this.setState({ fromUser, toUser });
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onMessageSubmit = e => {
    e.preventDefault();
    const { text, fromUser, toUser } = this.state;
    if (text !== "") this.props.addMessage(fromUser.uid, toUser.uid, text);
    this.setState({ text: "" });
  };

  renderInput = () => {
    const { text, errors } = this.state;
    return (
      <Form id="form-input" onSubmit={this.onMessageSubmit}>
        <FormField
          name="text"
          type="text"
          placeholder="Type your message and press ENTER..."
          value={text}
          error={errors.name}
          onChange={this.onTextChanged}
        />
      </Form>
    );
  };

  render() {
    const { messages, fromUser, toUser } = this.state;
    return (
      <React.Fragment>
        <div className="messages">
          <ListGroup>
            {messages.length > 0 &&
              messages.map((message, index) => (
                <Message
                  key={index}
                  message={message}
                  fromUser={fromUser}
                  toUser={toUser}
                  uid={this.props.auth.uid}
                />
              ))}
          </ListGroup>
        </div>
        {this.renderInput()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, sentProps) => {
  const { fromUid, toUid } = sentProps.match.params;
  const { firebase } = state;
  const { auth, data } = firebase;
  const { userMessages, users } = data;
  let passedUsers = [];
  if (users)
    Object.keys(users).forEach(key => {
      if (key === fromUid) passedUsers.push(users[key]);
      else if (key === toUid) passedUsers.push(users[key]);
    });
  let messages = [];
  if (userMessages) {
    Object.keys(userMessages).forEach(key => {
      if (key === fromUid) {
        const tempMessages = userMessages[key];
        Object.keys(tempMessages).forEach(k => {
          if (k === toUid) messages.push(tempMessages[k]);
        });
      }
    });
  }
  return {
    auth,
    users: passedUsers,
    messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (fromUid, toUid, text) =>
      dispatch(addMessage(fromUid, toUid, text)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect([`userMessages`, "users"])
  )(Messages)
);
