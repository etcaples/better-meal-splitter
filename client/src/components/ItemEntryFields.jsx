import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import AddFriend from './AddFriend';

const ItemEntryFields = (props) => {
  const {
    friends,
    handleFriendChange,
    handleFriendSubmit,
    handleItemChange,
    handlePriceChange,
    handleEaterSelect,
    handleItemSubmit,
    resetInput,
  } = props;
  return (
    <div>
      <AddFriend
        handleFriendChange={handleFriendChange}
        handleFriendSubmit={handleFriendSubmit}
      />
      <h4>
        {'Manual entry...'}
      </h4>
      <div>
        <input placeholder="item" onChange={e => handleItemChange(e)} />
        {'$'}
        <input placeholder="price" onChange={e => handlePriceChange(e)} />
        <div>
          {
            friends.map(friend => (
              <span>
                <Checkbox
                  friend={friend.name}
                  isChecked={friend.isChecked}
                  handleEaterSelect={handleEaterSelect}
                  key={friend.name}
                />
              </span>
            ))
          }
        </div>
      </div>
      <div>
        <button type="button" onClick={() => handleItemSubmit()}>
          {'Submit'}
        </button>
      </div>
    </div>
  );
};

ItemEntryFields.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
  handleEaterSelect: PropTypes.func.isRequired,
  handleItemSubmit: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
};

export default ItemEntryFields;
