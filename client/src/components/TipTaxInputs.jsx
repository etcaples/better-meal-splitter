import React from 'react';
import PropTypes from 'prop-types';

const TaxTipInputs = (props) => {
  const {
    getTax,
    getTip,
    combineTaxTip,
    totalAmounts,
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
        <div>
          {
            Object.keys(totalAmounts).map((person, index) => {
              let count = 0;
              count += 1;
              return (
                <ul key={count}>
                  {`${person}: $${totalAmounts[person].toFixed(2)}`}
                </ul>);
            })
          }
        </div>
      </div>
    </div>
  );
};

TaxTipInputs.propTypes = {
  getTax: PropTypes.func.isRequired,
  getTip: PropTypes.func.isRequired,
  combineTaxTip: PropTypes.func.isRequired,
  totalAmounts: PropTypes.instanceOf(PropTypes.object).isRequired,
};

export default TaxTipInputs;
