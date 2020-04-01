import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import { adjectives, nouns } from "./Username";

function randomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default class App extends Component {
  constructor() {
    super();
    this.drone = new window.Scaledrone("YOUR_CHANNEL_ID", {
      data: this.state.member
    });
    this.drone.on("open", error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");

    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor()
    }
  };
  onSendMessage = message => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>React Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}
