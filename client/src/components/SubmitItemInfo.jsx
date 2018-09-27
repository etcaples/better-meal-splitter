import React from 'react';
import PropTypes from 'prop-types';

const SubmitItemInfo = (props) => {
  const {
    handleItemSubmit,
  } = props;
  return (
    <button type="button" onClick={() => handleItemSubmit()}>
      {'Submit'}
    </button>
  );
};

SubmitItemInfo.propTypes = {
  handleItemSubmit: PropTypes.func.isRequired,
};

export default SubmitItemInfo;
