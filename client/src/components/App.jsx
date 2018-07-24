import React from 'react';
import ReactDOM from 'react-dom';
import ReceiptReader from './ReceiptReader';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: '',
      friends: [],
    };
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleFriendSubmit = this.handleFriendSubmit.bind(this);
  }

  handleFriendChange(e) {
    this.setState({ friendName: e.target.value });
  }

  handleFriendSubmit() {
    const friendsList = [].concat(this.state.friends);
    if (this.state.friends.includes(this.state.friendName) === false) {
      friendsList.push(this.state.friendName);
      this.setState({ friends: friendsList });
    }
  }

  render() {
    return (
      <div>
        <div>
          {'Better Meal Splitter'}
        </div>
        <div>
          <ReceiptReader
            friends={this.state.friends}
            handleFriendChange={this.handleFriendChange}
            handleFriendSubmit={this.handleFriendSubmit}
          />
        </div>
      </div>
    );
  }
}

// redux tutorial
// build this in redux

// airbnb style guide for all vscode projs

// google api to read text from pictures
// css modules

// refactor to React-Native

// deploy on heroku -- no db
// deploy on docker -- no db
// deploy on aws -- no db

ReactDOM.render(<App />, document.getElementById('app'));
