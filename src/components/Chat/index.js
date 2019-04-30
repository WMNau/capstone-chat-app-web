import React, { Component } from "react";

import { withAuthorization } from "../Session";

import { Form } from "react-bootstrap";
import "./chat.scss";

import isEmpty from "../../utils/isEmpty";

import Room from "./Room";
import Messages from "../Messages";

import FormField from "../common/FormField";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: [],
      count: 0,
      room: {},
      errors: {},
    };
  }

  onTextChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { text, room } = this.state;
    if (!isEmpty(text)) {
      this.setState(state => {
        const messages = state.messages.push({
          id: state.count,
          text,
          fullName: "Mike Nau",
          toId: room.id,
        });
        return {
          text: "",
          ...messages,
          count: state.count + 1,
        };
      });
    }
  };

  setRoom = room => {
    this.setState({ room });
  };

  setMessageTitle = () => {
    const { room } = this.state;
    let title;
    if (isEmpty(room)) title = "Messages";
    else title = room.name;
    return <h1>{title}</h1>;
  };

  setInputField = () => {
    const { text, room, errors } = this.state;
    if (isEmpty(room)) return null;
    else
      return (
        <Form id="input" onSubmit={this.onSubmit}>
          <FormField
            name="text"
            type="text"
            placeholder="Enter a new room name..."
            value={text}
            error={errors.name}
            onChange={this.onTextChanged}
          />
        </Form>
      );
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="chat">
        <Room setRoom={this.setRoom} />
        <div className="message">
          {this.setMessageTitle()}
          <Messages messages={messages} />
          {this.setInputField()}
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Chat);
