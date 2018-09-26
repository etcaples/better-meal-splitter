import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const ItemEntryFields = (props) => {
  const {
    friends,
    handleFriendChange,
    handleFriendSubmit,
    handleItemChange,
    handlePriceChange,
    handleEaterSelect,
    handleItemSubmit,
  } = props;
  return (
    <div>
      <div className="friend-add-div">
        <input onChange={e => handleFriendChange(e)} placeholder="Add friend..." />
        <button type="button" onClick={() => handleFriendSubmit()}>
          Submit
        </button>
      </div>
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
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
  handleEaterSelect: PropTypes.func.isRequired,
  handleItemSubmit: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
};

export default ItemEntryFields;
