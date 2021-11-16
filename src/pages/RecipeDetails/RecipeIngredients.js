import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeIngredients({ ingredients, measures }) {
  return (
    <>
      <h2>Ingredients</h2>
      <ul className="recipe-ingredients">
        {ingredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ ingredient[1] }
          >
            <span>{ingredient[1]}</span>
            {measures[index] && <span>{` - ${measures[index][1]}`}</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.array).isRequired,
  measures: PropTypes.arrayOf(PropTypes.array).isRequired,
};
