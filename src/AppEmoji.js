import React, {Component} from 'react';
import './App.css';
import Messages from './Messages';
import Input from './Input';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class App extends Component {
  constructor() {
    super();
    this.drone = new window.Scaledrone("hWlRObb8H2fqHAdw", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-room");

    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });

    this.handleTextFromChild = this.handleTextFromChild.bind(this);
  }
  // Testing
  // state = {
  //   messages: [
  //     {
  //       text: "This is a test message!",
  //       member: {
  //         color: "blue",
  //         username: "bluemoon"
  //       }
  //     }
  //   ],
  //   member: {
  //     username: randomName(),
  //     color: randomColor()
  //   }
  // }
  // onSendMessage = (message) => {
  //   const messages = this.state.messages
  //   messages.push({
  //     text: message,
  //     member: this.state.member
  //   })
  //   this.setState({messages: messages})
  // }
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor()
    },
    textInParent: '',
  }
  handleTextFromChild(data) {
    this.setState({
      textInParent: data
    });
  }
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
  addEmoji = (emoji) => {
    console.log(emoji.native);
    this.setState({
      textInParent: this.state.textInParent + emoji.native
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>AntsBox</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Picker title='Escolha o emoji' onSelect={this.addEmoji} style={{ position: 'absolute', bottom: '80px', left: '20px' }} />
        <Input
          propMethodToPass={this.handleTextFromChild}
          propToPass={this.state.textInParent}
          onSendMessage={this.onSendMessage}
        />
    </div>
    );
  }
}
