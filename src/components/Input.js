import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ htmlFor, label, testid, onChange, type, value }) {
  return (
    <label htmlFor={ htmlFor }>
      { label }
      <input
        type={ type }
        data-testid={ testid }
        value={ value }
        onChange={ onChange }
      />
    </label>
  );
}

Input.defaultProps = {
  value: undefined,
};

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
