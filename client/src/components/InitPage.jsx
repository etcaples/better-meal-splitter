import React from 'react';
import PropTypes from 'prop-types';
import AddFriend from './AddFriend';
import AddItemInfo from './AddItemInfo';
import ItemList from './ItemList';
import TallyIndivSubtotals from './TallyIndivSubtotals';

const ItemEntryFields = (props) => {
  const {
    friends,
    itemDetails,
    handleFriendChange,
    handleFriendSubmit,
    handleItemChange,
    handlePriceChange,
    handleEaterSelect,
    handleItemSubmit,
    setTallySubtotals,
  } = props;
  return (
    <div>
      <AddFriend
        handleFriendChange={handleFriendChange}
        handleFriendSubmit={handleFriendSubmit}
      />
      <AddItemInfo
        friends={friends}
        handleItemChange={handleItemChange}
        handlePriceChange={handlePriceChange}
        handleEaterSelect={handleEaterSelect}
        handleItemSubmit={handleItemSubmit}
      />
      <ItemList
        itemDetails={itemDetails}
      />
      <TallyIndivSubtotals setTallySubtotals={setTallySubtotals} />
    </div>
  );
};

ItemEntryFields.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
  handleEaterSelect: PropTypes.func.isRequired,
  handleItemSubmit: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
  setTallySubtotals: PropTypes.func.isRequired,
};

export default ItemEntryFields;
