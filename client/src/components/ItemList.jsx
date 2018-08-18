import React from 'react';
import PropTypes from 'prop-types';

const ItemList = (props) => {
  const { itemDetails, setTallySubtotals } = props;
  return (
    <div>
      <table>
        <tr>
          <th>
            Item
          </th>
          <th>
            Price
          </th>
          <th>
            Friends
          </th>
        </tr>
        {
          itemDetails.map(([item, price, friends]) => (
            <tr>
              <td>
                {item}
              </td>
              <td>
                {`$${price}`}
              </td>
              <td>
                {friends.map(friend => (
                  <p>
                    {friend}
                  </p>
                ))}
              </td>
            </tr>))
        }
      </table>
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
