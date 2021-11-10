import React, { useContext } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import './MainCocktailsRecipes.css';

function MainCocktailsRecipes() {
  const { cocktailsRecipes } = useContext(RecipesContext);

  const MAX_RECIPES = 12;

  return (
    <>
      <Header />
      <div className="cocktails-recipes-container">
        {cocktailsRecipes
          .slice(0, MAX_RECIPES)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <RecipeCard
              key={ idDrink }
              id={ idDrink }
              image={ strDrinkThumb }
              index={ index }
              title={ strDrink }
            />
          ))}
      </div>
      <Footer />
    </>
  );
}

export default MainCocktailsRecipes;
