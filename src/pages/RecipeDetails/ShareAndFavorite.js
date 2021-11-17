import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareAndFavorite({ recipe }) {
  // const [isFavorite, setIsFavorite] = useState(false);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  // const favoriteRecipesStorage = JSON.parse(
  //   localStorage.getItem('favoriteRecipes'),
  // );
  // const favoriteRecipes = favoriteRecipesStorage || [];

  // useEffect(() => {
  //   const recipeId = Object.keys(recipe)[0];
  //   const isFavoriteRecipe = favoriteRecipes.some(
  //     (curr) => curr.id === recipe[recipeId],
  //   );
  //   setIsFavorite(isFavoriteRecipe);
  //   // console.log(favoriteRecipesStorage, favoriteRecipes, isFavoriteRecipe);
  // }, []);

  return (
    <>
      <input
        alt="Share button"
        data-testid="share-btn"
        onClick={ () => {
          setShowCopyToClipboard(true);
          copy(window.location.href);
        } }
        src={ shareIcon }
        type="image"
      />
      {showCopyToClipboard && <span>Link copiado!</span>}
      <input
        alt="Favorite button"
        data-testid="favorite-btn"
        // src={
        //   favoriteRecipes.some((curr) => curr.id === recipe[params.id])
        //     ? blackHeartIcon
        //     : whiteHeartIcon
        // }
        src={ whiteHeartIcon }
        type="image"
      />
    </>
  );
}

ShareAndFavorite.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
