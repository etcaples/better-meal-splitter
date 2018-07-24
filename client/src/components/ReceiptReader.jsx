import React from 'react';
import PropTypes from 'prop-types'; // TODO: install prop-types to dependencies

const ReceiptReader = props => (
  <div>
    <div>
      <input onChange={e => props.handleFriendChange(e)} placeholder="Add friend..." />
      <div onClick={() => props.handleFriendSubmit()}>
        Submit
      </div>
    </div>
    <div>
      {'Manual entry...'}
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
    </div>

  </div>
);

ReceiptReader.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
};

export default ReceiptReader;
