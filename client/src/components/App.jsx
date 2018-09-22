import React from 'react';
import ReactDOM from 'react-dom';
import ItemEntryFields from './ItemEntryFields';
import ItemList from './ItemList';
import SubtotalList from './SubtotalList';
import '../css/main.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: '', // the friend to add to select drop
      friends: [], // all friends, to render checkboxes
      currentItem: '',
      currentPrice: 0,
      currentEaters: [],
      allRows: [], // array of arrays TODO: change to array of objects
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
    this.removeItemRow = this.removeItemRow.bind(this);
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
  // on page submit:
  //   calculate the total for each person

  /* CURRENT PRICE */
  handlePriceChange(e) {
    this.setState({ currentPrice: parseInt(e.target.value, 10) });
  }

  /* CURRENT FRIEND */
  handleEaterSelect(selectedEater) {
    const { currentEaters } = this.state;
    const newEaters = [].concat(currentEaters);
    if (newEaters.includes(selectedEater) === false) {
      newEaters.push(selectedEater);
    }
    this.setState({ currentEaters: newEaters });
  }

  handlePageSubmit() {
    // renders dollar amounts per person:
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
    this.setState({
      allRows: allRowsTemp,
      subtotal: newSubtotal,
      currentEaters: [],
    });
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

  removeItemRow(row) {
    // change the total prices and the prices per person
    const { allRows } = this.state;
    const remainingRows = [].concat(allRows);
    for (let i = 0; i < remainingRows.length; i++) {
      const thisRow = remainingRows[i];
      if (row[0] === thisRow[0] && row[1] === thisRow[1] && row[2] === thisRow[2]) {
        remainingRows.splice(i, 1);
      }
    }
    this.setState({ allRows: remainingRows });
  }

  render() {
    const {
      friends,
      allRows,
      priceTallies,
      totalAmounts,
    } = this.state;
    return (
      <div className="app-body">
        <h1>
          {'SplitMeal'}
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
            removeItemRow={this.removeItemRow}
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

ReactDOM.render(<App />, document.getElementById('app'));
