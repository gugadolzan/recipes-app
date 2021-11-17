import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../styles/RecipeCard.css';

function RecipeCard({ index, recipe }) {
  const { pathname } = useLocation();

  const [path, recipeId, recipeThumb, recipeTitle] = pathname.includes(
    '/comidas',
  )
    ? ['/comidas', recipe.idMeal, recipe.strMealThumb, recipe.strMeal]
    : ['/bebidas', recipe.idDrink, recipe.strDrinkThumb, recipe.strDrink];

  return (
    <Link
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      to={ `${path}/${recipeId}` }
    >
      <img
        alt={ recipeTitle }
        className="recipe-card-image"
        data-testid={ `${index}-card-img` }
        src={ recipeThumb }
      />
      <h3 className="recipe-card-title" data-testid={ `${index}-card-name` }>
        {recipeTitle}
      </h3>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeCard;
