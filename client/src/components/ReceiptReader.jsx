import React from 'react';

const ReceiptReader = props => (
  <div>
    <div>
      <input onChange={(e) => props.handleFriendChange(e)} placeholder="friend" />
      <div onClick={() => props.handleFriendSubmit()}>
        Submit
      </div>
    </div>
    <div>
      {'Manual entry...'}
      <input placeholder="item" />
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

export default ReceiptReader;
