import React from 'react';
import PropTypes from 'prop-types';

const SubtotalList = (props) => {
  const { priceTallies } = props;
  return (
    <div>
      {
        Object.keys(priceTallies).map(priceTallyKey => (<div>{priceTallyKey}{priceTallies[priceTallyKey]}</div>))
      }
    </div>
  );
};

// SubtotalList.propTypes = {
//   priceTallies: PropTypes.objectOf(PropTypes.number).isRequired,
// };

export default SubtotalList;
