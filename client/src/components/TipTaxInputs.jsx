import React from 'react';
import PropTypes from 'prop-types';

const TaxTipInputs = (props) => {
  const {
    getTax,
    getTip,
    combineTaxTip,
  } = props;
  return (
    <div>
      <div>
        <input onChange={() => getTax()} placeholder="add tax & other fees..." />
      </div>
      <div>
        <input onChange={() => getTip()} placeholder="add tip..." />
      </div>
      <div>
        <button onClick={() => combineTaxTip()} type="button">
          Finalize Tax/Tip
        </button>
      </div>
    </div>
  );
};

TaxTipInputs.propTypes = {
  getTax: PropTypes.func.isRequired,
  getTip: PropTypes.func.isRequired,
  combineTaxTip: PropTypes.func.isRequired,
};

export default TaxTipInputs;
