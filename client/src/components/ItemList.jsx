import React from 'react';
import PropTypes from 'prop-types';

const ItemList = (props) => {
  const { itemDetails, removeItemRow } = props;
  return (
    <div>
      <table>
        <thead>
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
        </thead>
        <tbody>
          {
            itemDetails.map(({ name, price, eaters }) => (
              <tr>
                <td>
                  {name}
                </td>
                <td>
                  {`$${price}`}
                </td>
                <td>
                  {eaters.map(eater => (
                    <p>
                      {eater}
                    </p>
                  ))}
                </td>
                <td>
                  {/* <button type="button" onClick={() => removeItemRow([item, price, friends])}>
                    Remove
                  </button> */}
                </td>
              </tr>))
          }
        </tbody>
      </table>
    </div>
  );
};

ItemList.propTypes = {
  itemDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeItemRow: PropTypes.func.isRequired,
};

export default ItemList;
