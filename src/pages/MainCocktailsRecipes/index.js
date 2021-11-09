import React, { useContext } from 'react';

import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import RecipesContext from '../../context/RecipesContext';

function MainCocktailsRecipes() {
  const { recipes } = useContext(RecipesContext);

  return (
    <div>
      <h1>MainCocktailsRecipes</h1>
      <SearchBar />
      <div className="cocktails-recipes-container">
        {recipes.map(({ idDrink, strDrink, strDrinkThumb }) => (
          <RecipeCard
            key={ idDrink }
            id={ idDrink }
            title={ strDrink }
            image={ strDrinkThumb }
          />
        ))}
      </div>
    </div>
  );
}

export default MainCocktailsRecipes;
