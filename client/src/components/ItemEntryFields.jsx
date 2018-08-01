import React from 'react';
import PropTypes from 'prop-types';

const ItemEntryFields = (props) => {
  const { friends } = props;
  return (
    <div>
      <div>
        <input onChange={e => props.handleFriendChange(e)} placeholder="Add friend..." />
        <button type="button" onClick={() => props.handleFriendSubmit()}>
          Submit
        </button>
      </div>
      <h4>
        {'Manual entry...'}
      </h4>
      <div>
        <input placeholder="item" onChange={e => props.handleItemChange(e)} />
        {'$'}
        <input placeholder="price" onChange={e => props.handlePriceChange(e)} />
        <select onChange={e => props.handleEaterSelect(e.target.value)}>
          <option value="1" selected>
            Choose a consumer
          </option>
          {
            friends.map(friend => (
              <option>
                {friend}
              </option>
            ))
          }
        </select>
        <button type="button" onClick={() => props.handleRowSubmit()}>
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
  handleRowSubmit: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
};

export default ItemEntryFields;
