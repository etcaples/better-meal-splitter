import React from 'react';
import PropTypes from 'prop-types';

const SubtotalList = (props) => {
  const {
    friends,
  } = props;
  return (
    <div>
      {
        friends.map(friend => (
          <div key={`${friend.name}-subtotal`}>
            <ul>
              {`${friend.name}: $${friend.subtotalTally}`}
            </ul>
          </div>))
      }
    </div>
  );
};

SubtotalList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SubtotalList;
