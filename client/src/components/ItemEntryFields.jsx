import React from 'react';
import PropTypes from 'prop-types';

const ItemEntryFields = props => (
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
      <input placeholder="item" />
      {'$'}
      <input placeholder="price" />
      <select>
        {
          props.friends.map(friend => (
            <option>
              {friend}
            </option>
          ))
        }
      </select>
      <button type="button">
        {'Submit'}
      </button>
    </div>

  </div>
);

ItemEntryFields.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
};

export default ItemEntryFields;
