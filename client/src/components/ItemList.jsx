import React from 'react';
import PropTypes from 'prop-types';

const ItemList = (props) => {
  const { itemDetails, setTallySubtotals } = props;
  return (
    <div>
      {
        itemDetails.map(([item, price, friends]) => (
          <ul>
            <span>
              {item}
            </span>
            <span>
              {price}
            </span>
            <span>
              {friends}
            </span>
          </ul>))
      }
      <button type="button" onClick={() => setTallySubtotals()}>
        Confirm Item Details (Get Subtotals)
      </button>
    </div>
  );
};

ItemList.propTypes = {
  itemDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTallySubtotals: PropTypes.func.isRequired,
};

export default ItemList;
