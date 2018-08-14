import React from 'react';
import ReactDOM from 'react-dom';
import ItemEntryFields from './ItemEntryFields';
import ItemList from './ItemList';
import SubtotalList from './SubtotalList';

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
      priceTallies: {},
      tax: 0,
      tip: 0,
      subtotal: 0,
      total: 0,
      percentages: {},
      totalAmounts: {},
    };
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleFriendSubmit = this.handleFriendSubmit.bind(this);
    this.handleEaterSelect = this.handleEaterSelect.bind(this);
    this.handleRowSubmit = this.handleRowSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.setTallySubtotals = this.setTallySubtotals.bind(this);
    this.getTax = this.getTax.bind(this);
    this.getTip = this.getTip.bind(this);
    this.combineTaxTip = this.combineTaxTip.bind(this);
    this.setIndivPercentages = this.setIndivPercentages.bind(this);
    this.handlePageSubmit = this.handlePageSubmit.bind(this);
  }

  setTallySubtotals() { // on item details confirmation
    const { allRows, priceTallies, percentages } = this.state;
    const priceTalliesTemp = Object.assign({}, priceTallies);
    const percentagesTemp = Object.assign({}, percentages); // empty object

    for (let i = 0; i < allRows.length; i++) {
      const friendsArr = allRows[i][2];
      for (let k = 0; k < friendsArr.length; k++) {
        if (priceTalliesTemp[friendsArr[k]] === undefined) {
          priceTalliesTemp[friendsArr[k]] = 0;
          percentagesTemp[friendsArr[k]] = 0;
        }
        priceTalliesTemp[friendsArr[k]] += allRows[i][1] / friendsArr.length;
      }
    }
    this.setState({ priceTallies: priceTalliesTemp, percentages: percentagesTemp });
  }

  // TODO: add a feature for custom tip flat rates and percentages,
  // ffor reading the tip off the final receipt, for standard 18% or 20%
  getTip(e) {
    this.setState({ tip: parseInt(e.target.value, 10) });
  }


  getTax(e) {
    this.setState({ tax: parseInt(e.target.value, 10) });
  }


  setIndivPercentages() {
    const {
      percentages,
      friends,
      priceTallies,
      subtotal,
    } = this.state;
    const newPercentages = Object.assign({}, percentages);
    for (let i = 0; i < friends.length; i++) {
      newPercentages[friends[i]] = priceTallies[friends[i]] / subtotal;
    }
    this.setState({ percentages: newPercentages }, () => {
      this.handlePageSubmit();
    });
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
    this.setState({ currentPrice: parseInt(e.target.value, 10) });
  }

  /* CURRENT FRIEND */
  handleEaterSelect(selectedEater) {
    const { currentEaters } = this.state;
    const newEaters = [].concat(currentEaters);
    // TODO: handle if someone's name is 'True'
    // TODO: handle if someone selects the placeholder
    if (newEaters.includes(selectedEater) === false) {
      newEaters.push(selectedEater);
    }
    this.setState({ currentEaters: newEaters });
  }

  handlePageSubmit() {
    // render dollar amounts per person:
    const { percentages, total, totalAmounts } = this.state;
    const newTotalAmounts = Object.assign({}, totalAmounts);
    const consumers = Object.keys(percentages);
    for (let i = 0; i < consumers.length; i++) {
      const percentage = percentages[consumers[i]];
      newTotalAmounts[consumers[i]] = (percentage * total).toFixed(2);
    }
    this.setState({ totalAmounts: newTotalAmounts });
  }

  handleRowSubmit() {
    const {
      currentItem,
      currentPrice,
      currentEaters,
      allRows,
      subtotal,
    } = this.state;
    const newRow = [currentItem, currentPrice, currentEaters];
    const allRowsTemp = [].concat(allRows);
    const newSubtotal = subtotal + currentPrice;
    allRowsTemp.push(newRow);
    this.setState({ allRows: allRowsTemp, subtotal: newSubtotal }); // also set state of total
  }

  combineTaxTip() { // on click for Finalize Tax/Tip
    const { tax, tip, subtotal } = this.state;
    let newTotal = subtotal;
    if (tax >= 0) {
      newTotal += tax;
    }
    if (tip >= 0) {
      newTotal += tip;
    }
    this.setState({ total: newTotal }, () => {
      this.setIndivPercentages();
    });
  }

  render() {
    const {
      friends,
      allRows,
      priceTallies,
      totalAmounts,
    } = this.state;
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
            setTallySubtotals={this.setTallySubtotals}
          />
        </div>
        <div>
          <SubtotalList
            priceTallies={priceTallies}
            getTax={this.getTax}
            getTip={this.getTip}
            combineTaxTip={this.combineTaxTip}
            totalAmounts={totalAmounts}
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
