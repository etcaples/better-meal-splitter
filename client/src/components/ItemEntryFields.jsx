import React from 'react';
import PropTypes from 'prop-types';

const ItemEntryFields = (props) => {
  const {
    friends,
    handleFriendChange,
    handleFriendSubmit,
    handleItemChange,
    handlePriceChange,
    // handleEaterSelect,
    handleRowSubmit,
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
        {/* <select onChange={e => handleEaterSelect(e.target.value)}> */}
        <div>
          {
            friends.map(friend => (
              <span>
                <input type="checkbox" key={friend} />
                <label htmlFor={friend}>
                  {friend}
                </label>
              </span>
            ))
          }
        </div>
        {/* </select> */}
      </div>
      <button type="button" onClick={() => handleRowSubmit()}>
        {'Submit'}
      </button>
    </div>
  );
};

ItemEntryFields.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
  // handleEaterSelect: PropTypes.func.isRequired,
  handleRowSubmit: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
};

export default ItemEntryFields;
