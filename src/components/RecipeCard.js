import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/RecipeCard.css';

export default function RecipeCard({ dataTestid, index, recipe, titleTestid }) {
  const keys = Object.keys(recipe);
  const [id, title, image] = [
    keys.find((key) => key.includes('id')),
    keys.find((key) => key === 'strMeal' || key === 'strDrink'),
    keys.find((key) => key.includes('Thumb')),
  ];

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
