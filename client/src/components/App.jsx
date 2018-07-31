import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ItemEntryFields from './ItemEntryFields';

// MVP:
// assign each item to one person
// then create a tally at the bottom of the page

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: '', // the friend to add to select drop
      friends: [], // all friends, to render select drop
      currentItem: '',
      currentPrice: 0,
      currentEaters: [],
      // singleRow: [], // array of currentItem-currentPrice-currentEaters
      allRows: [], // array of arrays
    };
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleFriendSubmit = this.handleFriendSubmit.bind(this);
  }

  /* SELECT-DROP */
  handleFriendChange(e) {
    this.setState({ friendName: e.target.value });
  }

  handleFriendSubmit() {
    const { friends, friendName } = this.state;
    const friendsList = [].concat({ friends });
    // TODO: only allow normal strings
    // TODO: character max of 20
    if ({ friends }.includes({ friendName }) === false) {
      friendsList.push({ friendName });
      this.setState({ friends: friendsList }, () => {
        // reset input to be empty
      });
    }
  }

  /* CURRENT ITEM */
  handleItemChange(e) {
    this.setState({ currentItem: e.target.value });
  }

  // sampleData() {
  //   let sampleDatas = [
  //     ['burger', 15.00, ['Emily', 'Sarah']],
  //     ['salad', 5.00, ['Hailey']],
  //     ['treats', 4.00, ['Emily']],
  //     ['snax', 5.00, ['Emily']],
  //   ];

  //   let priceTotals = {
  //     Emily: 0,
  //     Sarah: 0,
  //     Hailey: 0,
  //     Eric: 0,
  //   };
  // }

  // on page submit:
  //   calculate the total for each person

  /* CURRENT PRICE */
  handlePriceChange(e) {
    // only want to allow number inputs
    // 2 decimals only
    if (typeof e.target.value === 'number') {
      this.setState({ currentPrice: e.target.value });
    } else {
      window.alert('Please enter a number');
    }
  }

  /* CURRENT FRIEND */
  handleEaterSelect(e) {
    const { currentEaters } = this.state;
    const newEaters = [].concat({ currentEaters });

    newEaters.push(e.target.value);
    this.setState({ currentEaters: newEaters });
  }

  // on row submit:
  //   save item-price-friend in state as a row &&
  //     save item-price-state row in ALL ROWS state
  //     for each row, render rows

  handleRowSubmit() {
    const {
      currentItem,
      currentPrice,
      currentEaters,
      allRows,
    } = this.state;
    const newRow = [{ currentItem }, { currentPrice }, { currentEaters }];

    const allRowsTemp = [].concat({ allRows });
    allRowsTemp.push(newRow);
    this.setState({ allRows: allRowsTemp });
  }

  render() {
    const { friends } = this.state;
    return (
      <div>
        <h1>
          {'Better Meal Splitter'}
        </h1>
        <div>
          <ItemEntryFields
            friends={friends}
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
