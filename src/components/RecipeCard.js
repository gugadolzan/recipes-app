import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../styles/RecipeCard.css';

function RecipeCard({ id, image, index, title }) {
  const { pathname } = useLocation();

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
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
