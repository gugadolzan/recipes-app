import React, { useContext } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import './MainMealsRecipes.css';

function MainMealsRecipes() {
  const { recipes } = useContext(RecipesContext);

  return (
    <>
      <Header />
      <div className="meals-recipes-container">
        {recipes.map(({ idMeal, strMeal, strMealThumb }) => (
          <RecipeCard
            key={ idMeal }
            id={ idMeal }
            title={ strMeal }
            image={ strMealThumb }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MainMealsRecipes;
