import React from 'react';
import PropTypes from 'prop-types';

import './RecipeHeader.css';

export default function RecipeHeader({ category, image, title }) {
  return (
    <>
      <img
        alt={ title }
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ image }
      />
      <h1 data-testid="recipe-title">{title}</h1>
      <h3 data-testid="recipe-category">{category}</h3>
    </>
  );
}

RecipeHeader.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
