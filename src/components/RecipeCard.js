import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../styles/RecipeCard.css';

function RecipeCard({ id, image, title }) {
  const { pathname } = useLocation();

  return (
    <Link className="recipe-card" to={ `${pathname}/${id}` }>
      <img alt={ title } className="recipe-card-image" src={ image } />
      <h3>{title}</h3>
    </Link>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
