import React, {Component} from 'react';

class Input extends Component {
  state = {
    text: this.props.value,
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    // this.props.onSendMessage(this.state.text);
    this.props.onSendMessage(this.props.propToPass);
  }
  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            // onChange={e => this.onChange(e)}
            onChange={e => this.props.propMethodToPass(e.target.value)}
            // value={this.state.text}
            value={this.props.propToPass}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;