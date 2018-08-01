import React from 'react';
import ReactDOM from 'react-dom';
import ItemEntryFields from './ItemEntryFields';
import ItemList from './ItemList';

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
      allRows: [], // array of arrays
    };
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleFriendSubmit = this.handleFriendSubmit.bind(this);
    this.handleEaterSelect = this.handleEaterSelect.bind(this);
    this.handleRowSubmit = this.handleRowSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  /* SELECT-DROP */
  handleFriendChange(e) {
    this.setState({ friendName: e.target.value });
  }

  handleFriendSubmit() {
    const { friends, friendName } = this.state;
    const friendsList = [].concat(friends);
    // TODO: only allow normal strings
    // TODO: character max of 20
    if (friends.includes(friendName) === false) {
      friendsList.push(friendName);
      this.setState({ friends: friendsList }, () => {
        // reset input to be empty
      });
    }
  }

  /* CURRENT ITEM */
  handleItemChange(e) {
    this.setState({ currentItem: e.target.value });
  }

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

  // on page submit:
  //   calculate the total for each person

  /* CURRENT PRICE */
  handlePriceChange(e) {
    // only want to allow number inputs
    // 2 decimals only
    this.setState({ currentPrice: e.target.value });
  }

  /* CURRENT FRIEND */
  handleEaterSelect(selectedEater) {
    const { currentEaters } = this.state;
    const newEaters = [].concat(currentEaters);
    // TODO: handle if someone's name is true
    // TODO: handle if someone selects the placeholder
    if (newEaters.includes(selectedEater) === false) {
      newEaters.push(selectedEater);
    }
    this.setState({ currentEaters: newEaters });
  }

  // on row submit:
  handleRowSubmit() {
    const {
      currentItem,
      currentPrice,
      currentEaters,
      allRows,
    } = this.state;
    const newRow = [currentItem, currentPrice, currentEaters];
    //   save item-price-friend in state as a row &&
    //     save item-price-state row in ALL ROWS state
    const allRowsTemp = [].concat(allRows);
    allRowsTemp.push(newRow);
    this.setState({ allRows: allRowsTemp });
    //     for each row, render rows
  }

  render() {
    const { friends, allRows } = this.state;
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
            handleEaterSelect={this.handleEaterSelect}
            handleRowSubmit={this.handleRowSubmit}
            handlePriceChange={this.handlePriceChange}
            handleItemChange={this.handleItemChange}
          />
        </div>
        <div>
          <ItemList
            itemDetails={allRows}
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
