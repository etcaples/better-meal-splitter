import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import SubmitItemInfo from './SubmitItemInfo';

const AddItemInfo = (props) => {
  const {
    handleItemChange,
    handlePriceChange,
    friends,
    handleEaterSelect,
    handleItemSubmit,
  } = props;
  return (
    <div>
      <h4>
        {'Manual entry...'}
      </h4>
      <div>
        <form>
          <input placeholder="item" onChange={e => handleItemChange(e)} />
          {'$'}
          <input placeholder="price" onChange={e => handlePriceChange(e)} />
          <div>
            {
              friends.map(friend => (
                <span key={`${friend.name}-checkbox`}>
                  <Checkbox
                    friend={friend.name}
                    isChecked={friend.isChecked}
                    handleEaterSelect={handleEaterSelect}
                  />
                </span>
              ))
            }
          </div>
          <div>
            <SubmitItemInfo handleItemSubmit={handleItemSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

AddItemInfo.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleEaterSelect: PropTypes.func.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
  handleItemChange: PropTypes.func.isRequired,
  handleItemSubmit: PropTypes.func.isRequired,
};

export default AddItemInfo;
