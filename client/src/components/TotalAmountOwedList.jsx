import React from 'react';
import PropTypes from 'prop-types';

const AmountOwedList = (props) => {
  const {
    friends,
  } = props;
  return (
    <div>
      {
        friends.map(friend => (
          <ul key={`${friend.name}-total`}>
            {`${friend.name}: $${friend.totalTally}`}
          </ul>))
      }
    </div>
  );
};

AmountOwedList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AmountOwedList;
