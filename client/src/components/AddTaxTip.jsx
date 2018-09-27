import React from 'react';
import PropTypes from 'prop-types';

const AddTaxTip = (props) => {
  const {
    getTax,
    getTip,
    combineTaxTip,
  } = props;
  return (
    <div>
      <div>
        <input onChange={e => getTax(e)} placeholder="add tax & other fees..." />
      </div>
      <div>
        <input onChange={e => getTip(e)} placeholder="add tip..." />
      </div>
      <div>
        <button onClick={() => combineTaxTip()} type="button">
          Finalize Tax/Tip
        </button>
      </div>
    </div>
  );
};

AddTaxTip.propTypes = {
  getTax: PropTypes.func.isRequired,
  getTip: PropTypes.func.isRequired,
  combineTaxTip: PropTypes.func.isRequired,
};

export default AddTaxTip;
