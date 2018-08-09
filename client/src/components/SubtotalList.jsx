import React from 'react';
import PropTypes from 'prop-types';
import TipTaxInputs from './TipTaxInputs';

const SubtotalList = (props) => {
  const {
    priceTallies,
    getTax,
    getTip,
    combineTaxTip,
  } = props;
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
        <TipTaxInputs
          getTax={getTax}
          getTip={getTip}
          combineTaxTip={combineTaxTip}
        />
      </div>
    </div>
  );
};

SubtotalList.propTypes = {
  priceTallies: PropTypes.objectOf(PropTypes.number).isRequired,
  // getTax: PropTypes.func.isRequired,
  // getTip: PropTypes.func.isRequired,
  // combineTaxTip: PropTypes.func.isRequired,
};

export default SubtotalList;
