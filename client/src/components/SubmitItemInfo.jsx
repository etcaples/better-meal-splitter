import React from 'react';
import PropTypes from 'prop-types';

const SubmitItemInfo = (props) => {
  const {
    handleItemSubmit,
  } = props;
  return (
    <input type="reset" value="Submit" onClick={() => handleItemSubmit()} />
  );
};

SubmitItemInfo.propTypes = {
  handleItemSubmit: PropTypes.func.isRequired,
};

export default SubmitItemInfo;
