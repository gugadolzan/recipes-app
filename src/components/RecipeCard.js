import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/RecipeCard.css';

function RecipeCard({ index, recipe }) {
  const { pathname } = useLocation();
  const id = pathname === '/comidas' ? recipe.idMeal : recipe.idDrink;
  const image = pathname === '/comidas' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const title = pathname === '/comidas' ? recipe.strMeal : recipe.strDrink;

  return (
    <Link
      className="recipe-card"
      data-testid={ `${index}-${dataTestid}` }
      to={ `${id.includes('Meal') ? '/comidas' : '/bebidas'}/${recipe[id]}` }
    >
      <h3 className="recipe-card-title" data-testid={ `${index}-${titleTestid}` }>
        {recipe[title]}
      </h3>
      <img
        alt={ recipe[title] }
        className="recipe-card-image"
        data-testid={ `${index}-card-img` }
        src={ recipe[image] }
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  dataTestid: PropTypes.string,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  titleTestid: PropTypes.string,
};

RecipeCard.defaultProps = {
  dataTestid: 'recipe-card',
  titleTestid: 'card-name',
};

export default RecipeCard;
