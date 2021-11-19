import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../styles/RecipeCard.css';

function RecipeCard({ index, recipe }) {
  const { pathname } = useLocation();
  const id = pathname === '/comidas' ? recipe.idMeal : recipe.idDrink;
  const image = pathname === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const title = pathname === '/comidas' ? recipe.strMeal : recipe.strDrink;

  return (
    <Link
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      to={ `${pathname}/${id}` }
    >
      <img
        alt={ title }
        className="recipe-card-image"
        data-testid={ `${index}-card-img` }
        src={ image }
      />
      <h3 data-testid={ `${index}-card-name` }>{title}</h3>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeCard;
