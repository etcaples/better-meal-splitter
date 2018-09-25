import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { friend, isChecked, handleEaterSelect } = props;
  return (
    <span>
      <label htmlFor={friend} onChange={e => handleEaterSelect(e.target.value)}>
        <input type="checkbox" key={friend} value={friend} checked={isChecked} />
        {friend}
      </label>
    </span>);
};

Checkbox.propTypes = {
  friend: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleEaterSelect: PropTypes.func.isRequired,
};

export default Checkbox;
