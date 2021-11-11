import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => {
        if (ingredient) {
          return (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name` }
            >
              {ingredient}
              {' '}
            </li>);
        }
        return null;
      })}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
