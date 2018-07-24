import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReceiptReader from './ReceiptReader';

// MVP:
// assign each item to one person
// then create a tally at the bottom of the page

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: '',
      friends: [],
      item: '',
      entryRow: [],
      receiptItems: [], // array of entryRow arrays
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

  handleItemChange(e) {
    this.setState({ item: e.target.value });
  }

  // handle item submit: on ROW submit, render to page

  handlePriceChange(e) {
    // only want to allow number inputs
    // 2 decimals only
    if (typeof e.target.value === 'number') {
      this.setState({ price: e.target.value });
    } else {
      window.alert('Please enter a number');
    }
  }

  handleFriendSelect() {

  };

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

App.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  friendName: PropTypes.string.isRequired,
};

ReactDOM.render(<App />, document.getElementById('app'));
