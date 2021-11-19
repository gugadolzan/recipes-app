import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import Header from '../../components/Header';

// import blackHeartIcon from '../../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function FavoriteRecipes() {
  // const [id, image, name, type] = Object.keys(recipe)[0].includes('Meal')
  //   ? ['idMeal', 'strMealThumb', 'strMeal', 'comida']
  //   : ['idDrink', 'strDrinkThumb', 'strDrink', 'bebida'];

  const filterFavorite = ['All', 'Food', 'Drinks'];

  const [loading, setLoading] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  const favoriteRecipesStorage = JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipesStorage);
  console.log(favoriteRecipesStorage);
  // const favoriteRecipes = favoriteRecipesStorage || [];
  // const isItFavorite = favoriteRecipes.some((curr) => curr.id === recipe[id]);

  // useEffect(() => {
  //   setIsFavorite(isItFavorite);
  // }, [isItFavorite]);

  // const handleFavorite = () => {
  //   const { strAlcoholic, strArea, strCategory } = recipe;

  //   const favoriteRecipe = {
  //     // id: recipe[id],
  //     // type,
  //     area: strArea || '',
  //     category: strCategory || '',
  //     alcoholicOrNot: strAlcoholic || '',
  //     // name: recipe[name],
  //     // image: recipe[image],
  //   };

  //   let newFavoriteRecipes;

  //   if (isFavorite) {
  //     newFavoriteRecipes = favoriteRecipes.filter(
  //       (curr) => curr.id !== favoriteRecipe.id,
  //     );
  //     setIsFavorite(false);
  //   } else {
  //     newFavoriteRecipes = [...favoriteRecipes, favoriteRecipe];
  //     setIsFavorite(true);
  //   }

  //   localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  // };

  // useEffect(() => {
  //   let newFavoriteStorage = favoriteRecipesStorage;
  //   switch (e.target) {
  //   case 'Food':
  //     newFavoriteStorage = newFavoriteStorage.filter((meals) => (
  //       meals.type === 'comida'
  //     ));
  //     break;
  //   case 'Drinks':
  //     newFavoriteStorage = newFavoriteStorage.filter((meals) => (
  //       meals.type === 'bebida'
  //     ));
  //     break;
  //   default:
  //     break;
  //   }
  //   setFilter(newFavoriteRecipes);
  // }, [newFavoriteRecipes]);

  const handleFavoriteClick = (filterType) => {
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
    if (filterType === 'Drinks') {
      const drinksRecipes = allRecipes.filter(({ type }) => type === 'bebida');
      setFavoriteRecipes(drinksRecipes);
    }
  };

  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="header-padding-top main-background">
        <div className="category-filter-container">
          {filterFavorite.map((filter) => (
            <button
              className="category-filter"
              data-testid={ `filter-by-${filter}-btn` }
              key={ filter }
              onClick={ ({ target }) => handleFavoriteClick(target.value) }
              type="button"
              value={ filter }
            >
              {filter}
            </button>
          ))}
        </div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="recipes-container">
            {favoriteRecipes.map((recip, index) => (
              <div key={ index }>
                <h4>{recip.category}</h4>
                <h3>{ recip.name }</h3>
                <img
                  alt={ recip.name }
                  className="recipe-card-image"
                  data-testid={ `${index}-card-img` }
                  src={ recip.image }
                />
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
                  // onClick={ handleFavorite }
                  // src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  type="image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

FavoriteRecipes.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteRecipes;
