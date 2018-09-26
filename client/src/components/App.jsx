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
      friendName: '',
      friends: [], // array of friend objects
      currentItem: '',
      currentPrice: 0,
      currentEaters: [],
      items: [], // array of item objects
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
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.setTallySubtotals = this.setTallySubtotals.bind(this);
    this.getTax = this.getTax.bind(this);
    this.getTip = this.getTip.bind(this);
    this.combineTaxTip = this.combineTaxTip.bind(this);
    this.setIndivPercentages = this.setIndivPercentages.bind(this);
    this.handlePageSubmit = this.handlePageSubmit.bind(this);
    this.removeItemRow = this.removeItemRow.bind(this);
    this.resetAllCheckboxes = this.resetAllCheckboxes.bind(this);
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

  /*
    handleFriendChange handles a single consumer name input
  */
  handleFriendChange(e) {
    this.setState({ friendName: e.target.value });
  }

  handleFriendSubmit() {
    const { friends, friendName } = this.state;
    const friend = {
      name: friendName,
      isChecked: false,
    };
    const friendsList = [].concat(friends);
    let doesInclude = false;
    for (let i = 0; i < friendsList.length; i++) {
      if (friendsList[i].name === friendName) {
        doesInclude = true;
      }
    }
    if (doesInclude === false) {
      friendsList.push(friend);
      this.setState({ friends: friendsList }, () => {
        // reset input to be empty
      });
    }
  }

  /* CURRENT ITEM */
  handleItemChange(e) {
    this.setState({ currentItem: e.target.value });
  }

  /* CURRENT PRICE */
  handlePriceChange(e) {
    this.setState({ currentPrice: parseInt(e.target.value, 10) });
  }

  /* CURRENT FRIEND */
  handleEaterSelect(selectedEater) {
    const { friends, currentEaters } = this.state;
    const eaters = [].concat(currentEaters);
    const friendsList = [].concat(friends);
    if (eaters.includes(selectedEater) === false) {
      eaters.push(selectedEater); // add it
    } else {
      eaters.splice(eaters.indexOf(selectedEater), 1); // remove it
    }

    for (let i = 0; i < friendsList.length; i++) {
      const currFriend = friendsList[i];
      if (currFriend.name === selectedEater) {
        if (currFriend.isChecked === false) {
          currFriend.isChecked = true;
        } else {
          currFriend.isChecked = false;
        }
        break;
      }
    }
    this.setState({ friends: friendsList, currentEaters: eaters });
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

  handleItemSubmit() {
    const {
      currentItem,
      currentPrice,
      currentEaters,
      items,
      subtotal,
    } = this.state;
    const item = {
      name: currentItem,
      price: currentPrice,
      eaters: currentEaters,
    };
    const currItems = [].concat(items);
    const newSubtotal = subtotal + currentPrice;
    currItems.push(item);
    this.setState({
      items: currItems,
      subtotal: newSubtotal,
      currentEaters: [],
    }, () => this.resetAllCheckboxes());
  }

  resetAllCheckboxes() {
    const { friends } = this.state;
    const tempFriends = [].concat(friends);
    for (let i = 0; i < tempFriends.length; i++) {
      const friend = tempFriends[i];
      if (friend.isChecked) {
        friend.isChecked = false;
      }
    }
    this.setState({ friends: tempFriends });
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
      items,
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
            handleItemSubmit={this.handleItemSubmit}
            handlePriceChange={this.handlePriceChange}
            handleItemChange={this.handleItemChange}
          />
        </div>
        <div>
          <ItemList
            itemDetails={items}
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
