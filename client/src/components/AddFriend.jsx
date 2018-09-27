import React from 'react';
import PropTypes from 'prop-types';

const AddFriend = (props) => {
  const {
    handleFriendChange,
    handleFriendSubmit,
  } = props;
  return (
    <div className="friend-add-div">
      <input onChange={e => handleFriendChange(e)} placeholder="Add friend..." />
      <button type="button" onClick={() => handleFriendSubmit()}>
      Submit
      </button>
    </div>
  );
};

AddFriend.propTypes = {
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
};

export default AddFriend;
