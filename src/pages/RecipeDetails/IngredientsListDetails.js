import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({ ingredients, measure }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        ingredient && (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name` }
          >
            {ingredient}
            {' '}
            -
            {measure}
            {' '}
          </li>
        )))}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measure: PropTypes.arrayOf(PropTypes.string).isRequired,
};
