import React from 'react';
import PropTypes from 'prop-types';

const TaxTipInputs = () => {
  return (
    <div>
      <div>
        <input placeholder="add tax & other fees..." />
      </div>
      <div>
        <input placeholder="add tip..." />
      </div>
    </div>
  );
};

TaxTipInputs.propTypes = {

};

export default TaxTipInputs;
