import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeIngredients({ ingredients, measures }) {
  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          <span>{ingredient[1]}</span>
          {measures[index] && <span>{` - ${measures[index][1]}`}</span>}
        </li>
      ))}
    </ul>
  );
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.array).isRequired,
  measures: PropTypes.arrayOf(PropTypes.array).isRequired,
};
