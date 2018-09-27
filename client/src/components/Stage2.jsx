import React from 'react';
import PropTypes from 'prop-types';
import SubtotalList from './SubtotalList';
import AddTaxTip from './AddTaxTip';

const Stage2 = (props) => {
  const {
    friends,
    getTax,
    getTip,
    combineTaxTip,
  } = props;
  return (
    <div>
      <SubtotalList
        friends={friends}
      />
      <AddTaxTip
        getTax={getTax}
        getTip={getTip}
        combineTaxTip={combineTaxTip}
      />
    </div>
  );
};

Stage2.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTax: PropTypes.func.isRequired,
  getTip: PropTypes.func.isRequired,
  combineTaxTip: PropTypes.func.isRequired,
};

export default Stage2;
