import React from 'react';
import PropTypes from 'prop-types';

export default function SearchRadio({ checked, id, label, name, onChange }) {
  return (
    <label htmlFor={ `${id}-${name}` }>
      <input
        checked={ checked }
        data-testid={ `${id}-${name}` }
        id={ `${id}-${name}` }
        name={ name }
        onChange={ onChange }
        type="radio"
        value={ id }
      />
      {label}
    </label>
  );
}

SearchRadio.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
