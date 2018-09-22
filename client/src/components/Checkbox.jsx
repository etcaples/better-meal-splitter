import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { friend } = props;
  return (
    <span>
      <label htmlFor={friend}>
        <input type="checkbox" key={friend} checked="false" />
        {friend}
      </label>
    </span>);
};

Checkbox.propTypes = {
  friend: PropTypes.string.isRequired,
};

export default Checkbox;
