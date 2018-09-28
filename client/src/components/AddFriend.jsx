import React from 'react';
import PropTypes from 'prop-types';

const AddFriend = (props) => {
  const {
    handleFriendChange,
    handleFriendSubmit,
  } = props;
  return (
    <div className="friend-add-div">
      <form>
        <input onChange={e => handleFriendChange(e)} placeholder="Add friend..." />
        <input type="reset" value="Submit" onClick={() => handleFriendSubmit()} />
      </form>
    </div>
  );
};

AddFriend.propTypes = {
  handleFriendChange: PropTypes.func.isRequired,
  handleFriendSubmit: PropTypes.func.isRequired,
};

export default AddFriend;
