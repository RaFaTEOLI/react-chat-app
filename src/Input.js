import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
// get our fontawesome imports
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Input extends Component {
  state = {
    text: '',
    showEmoji: false,
  }
  showEmoji() {
    if (this.state.showEmoji) {
      return (
        <Picker title='Escolha o emoji' onSelect={this.addEmoji} style={{ position: 'absolute', bottom: '80px', left: '20px' }} />
      );
    }
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }
  addEmoji = (emoji) => {
    console.log(emoji.native);
    this.setState({
      text: this.state.text + emoji.native
    });
  }
  onClickEmoji(e) {
    e.preventDefault();
    console.log('teste');
    if (this.state.showEmoji) {
        this.setState({showEmoji: false});
    } else {
        this.setState({showEmoji: true});
    }
  }
  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          {this.showEmoji()}
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button style={{backgroundColor: 'blue'}} onClick={e => this.onClickEmoji(e)}><FontAwesomeIcon icon={faLaughBeam} /></button>
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
