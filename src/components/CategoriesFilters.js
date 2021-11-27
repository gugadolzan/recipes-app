// used in favorites and done recipes pages

import React from 'react';
import PropTypes from 'prop-types';

const FILTER_BUTTONS = [
  {
    dataTestId: 'filter-by-all-btn',
    filter: 'All',
    value: '',
  },
  {
    dataTestId: 'filter-by-food-btn',
    filter: 'Food',
    value: 'comida',
  },
  {
    dataTestId: 'filter-by-drink-btn',
    filter: 'Drinks',
    value: 'bebida',
  },
];

export default function CategoriesFilters({ onClick }) {
  return (
    <div className="category-filter-container">
      {FILTER_BUTTONS.map(({ dataTestId, filter, value }) => (
        <button
          className="category-filter"
          data-testid={ dataTestId }
          key={ filter }
          onClick={ onClick }
          type="button"
          value={ value }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

CategoriesFilters.propTypes = {
  onClick: PropTypes.func.isRequired,
};
