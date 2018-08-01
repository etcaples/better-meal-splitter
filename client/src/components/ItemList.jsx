import React from 'react';
import PropTypes from 'prop-types';

const ItemList = (props) => {
  const { itemDetails } = props;
  return (
    <div>
      {
        itemDetails.map(([item, price, friends]) => (
          <ul>
            {item}, {price}, {friends}
          </ul>))
      }
    </div>
  );
};

ItemList.propTypes = {
  itemDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ItemList;
