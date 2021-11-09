import React, { useContext } from 'react';

import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import RecipesContext from '../../context/RecipesContext';

function MainMealsRecipes() {
  const { recipes } = useContext(RecipesContext);

  return (
    <div>
      <h1>MainMealsRecipes</h1>
      <SearchBar />
      {recipes.map(({ idMeal, strMeal, strMealThumb }) => (
        <RecipeCard
          key={ idMeal }
          id={ idMeal }
          title={ strMeal }
          image={ strMealThumb }
        />
      ))}
    </div>
  );
}

export default MainMealsRecipes;
