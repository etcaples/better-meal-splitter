import React from 'react';
import PropTypes from 'prop-types';

const AmountOwedList = (props) => {
  const {
    friends,
  } = props;
  return (
    <div>
      {
        Object.keys(friends).map((friend) => {
          let count = 0;
          count += 1;
          return (
            <ul key={count}>
              {`${friend.name}: $${friend.total}`}
            </ul>);
        })
      }
    </div>
  );
};

AmountOwedList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AmountOwedList;
