import React from 'react';
import PropTypes from 'prop-types';
import TipTaxInputs from './TipTaxInputs';

const SubtotalList = (props) => {
  const {
    friends,
    getTax,
    getTip,
    combineTaxTip,
    totalAmounts,
  } = props;
  return (
    <div>
      {
        friends.map(friend => (
          <div>
            <ul>
              {`${friend.name}: $${friend.priceTally}`}
            </ul>
          </div>))
      }
      <div>
        <TipTaxInputs
          getTax={getTax}
          getTip={getTip}
          combineTaxTip={combineTaxTip}
          totalAmounts={totalAmounts}
        />
      </div>
    </div>
  );
};

SubtotalList.propTypes = {
  friends: PropTypes.objectOf(PropTypes.any).isRequired,
  getTax: PropTypes.func.isRequired,
  getTip: PropTypes.func.isRequired,
  combineTaxTip: PropTypes.func.isRequired,
  totalAmounts: PropTypes.instanceOf(PropTypes.object).isRequired,
};

export default SubtotalList;
