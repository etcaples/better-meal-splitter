import React from 'react';
import PropTypes from 'prop-types';
import TipTaxInputs from './TipTaxInputs';

const SubtotalList = (props) => {
  console.log(this);
  const { priceTallies } = props;
  return (
    <div>
      {
        Object.keys(priceTallies).map(priceTallyKey => (
          <div>
            <ul>
              {`${priceTallyKey}: $${priceTallies[priceTallyKey]}`}
            </ul>
          </div>))
      }
      <div>
        <TipTaxInputs />
      </div>
    </div>
  );
};

SubtotalList.propTypes = {
  priceTallies: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default SubtotalList;
