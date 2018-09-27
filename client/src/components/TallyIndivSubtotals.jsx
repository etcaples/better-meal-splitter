import React from 'react';
import PropTypes from 'prop-types';

const TallyIndivSubtotals = (props) => {
  const { setTallySubtotals } = props;
  return (
    <button type="button" onClick={() => setTallySubtotals()}>
      Confirm Item Details (Get Subtotals)
    </button>
  );
};

TallyIndivSubtotals.propTypes = {
  setTallySubtotals: PropTypes.func.isRequired,
};

export default TallyIndivSubtotals;
