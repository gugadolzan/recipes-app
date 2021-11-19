import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';

import Header from '../../components/Header';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  const filterFavorite = ['All', 'Food', 'Drink'];

  const favoriteRecipesStorage = JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesStorage);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  const handleFilterClick = (filterType) => {
    const allRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (filterType === 'All') {
      setFavoriteRecipes(allRecipes);
    }
    if (filterType === 'Food') {
      const foodRecipes = allRecipes.filter(({ type }) => type === 'comida');
      setFavoriteRecipes(foodRecipes);
    }
    if (filterType === 'Drink') {
      const drinksRecipes = allRecipes.filter(({ type }) => type === 'bebida');
      setFavoriteRecipes(drinksRecipes);
    }
  };

  const handleFavorite = (target) => {
    const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteStorage = allRecipes.filter((recipe) => recipe.id !== target.value);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteStorage));
    setFavoriteRecipes(newFavoriteStorage);
  };

  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="header-padding-top main-background">
        <div className="category-filter-container">
          {filterFavorite.map((filter) => (
            <button
              className="category-filter"
              data-testid={ `filter-by-${filter.toLowerCase()}-btn` }
              key={ filter }
              onClick={ ({ target }) => handleFilterClick(target.value) }
              type="button"
              value={ filter }
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="recipes-container">
          {favoriteRecipes.map((recip, index) => (
            <div key={ index }>
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                {recip.alcoholicOrNot}
                {recip.area}
                {' - '}
                {recip.category}
              </h4>
              <Link
                to={ recip.type === 'comida'
                  ? `/comidas/${recip.id}`
                  : `/bebidas/${recip.id}` }
              >
                <h3 data-testid={ `${index}-horizontal-name` }>{ recip.name }</h3>
                <img
                  alt={ recip.name }
                  className="recipe-card-image"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recip.image }
                />
              </Link>
              <input
                alt="Share button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  setShowCopyToClipboard(true);
                  copy(recip.type === 'comida'
                    ? `http://localhost:3000/comidas/${recip.id}`
                    : `http://localhost:3000/bebidas/${recip.id}`);
                } }
                src={ shareIcon }
                type="image"
              />
              {showCopyToClipboard && <span>Link copiado!</span>}
              <input
                alt="Favorite button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ ({ target }) => handleFavorite(target) }
                src={ blackHeartIcon }
                type="image"
                value={ recip.id }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteRecipes;
