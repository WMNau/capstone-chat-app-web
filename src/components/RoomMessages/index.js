import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Form, ListGroup } from "react-bootstrap";

import FormField from "../common/FormField";

import Message from "./RoomMessage";

import "./messages.scss";

import { addChat } from "../../store/actions/chats.action";

const INITIAL_STATE = {
  text: "",
  messages: [],
  errors: {},
};

class RoomMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    messages: PropTypes.object,
    addChat: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { chats } = this.props;
    if (chats) this.setMessages(chats);
  };

  componentWillReceiveProps = nextProps => {
    const { chats } = nextProps;
    if (chats) this.setMessages(chats);
  };

  setMessages = chats => {
    this.setState(() => {
      const messages = Object.keys(chats).map(key => chats[key]);
      return { messages };
    });
  };

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { text } = this.state;
    if (text !== "") {
      this.props.addChat(this.props.match.params.id, text);
      this.setState({ text: "" });
    }
  };

  renderInput = () => {
    const { text, errors } = this.state;
    return (
      <Form id="form-input" onSubmit={this.onSubmit}>
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
    const { messages } = this.state;
    const { users, auth } = this.props;
    return (
      <div className="room-messages">
        <div className="messages">
          <ListGroup>
            {messages &&
              users &&
              auth &&
              messages.map((message, index) => (
                <Message
                  key={index}
                  message={message}
                  user={users[message.fromUid]}
                  currentUid={auth.uid}
                />
              ))}
          </ListGroup>
        </div>
        {this.renderInput()}
      </div>
    );
  }
}

const mapStateToProps = (state, sentProps) => {
  const { id } = sentProps.match.params;
  const { firebase } = state;
  const { auth, data } = firebase;
  const { chats, users } = data;
  let messages = null;
  if (chats && chats[id]) messages = chats[id];
  return {
    auth,
    chats: messages,
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChat: (room, text) => dispatch(addChat(room, text)),
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firebaseConnect(["chats", "users"])
  )(RoomMessages)
);
