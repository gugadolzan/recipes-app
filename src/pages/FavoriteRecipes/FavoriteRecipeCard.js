import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function FavoriteRecipeCard({ index, recipe }) {
  const { alcoholicOrNot, area, category, id, image, name, type } = recipe;
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  const handleFavorite = (target) => {
    const favoriteRecipesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const newFavoriteRecipesStorage = favoriteRecipesStorage.filter(
      (curr) => curr.id !== target.value,
    );
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipesStorage),
    );
    // setFavoriteRecipes(newFavoriteStorage);
  };

  return (
    <div className="favorite-recipe-card">
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot}
        {area}
        {' - '}
        {category}
      </h4>

      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        <img
          alt={ name }
          className="recipe-card-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
        />
      </Link>

      <div className="share-and-favorite">
        {showCopyToClipboard && (
          <span className="share-text">Link copiado!</span>
        )}
        <input
          alt="Share button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            setShowCopyToClipboard(true);
            const url = window.location.href.split('/');
            copy(`${url[0]}//${url[2]}/${type}s/${id}`);
          } }
          src={ shareIcon }
          type="image"
        />
        <input
          alt="Favorite button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ ({ target }) => handleFavorite(target) }
          src={ blackHeartIcon }
          type="image"
          value={ id }
        />
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
