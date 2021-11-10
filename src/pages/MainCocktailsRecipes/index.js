import React, { useContext } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import './MainCocktailsRecipes.css';

function MainCocktailsRecipes() {
  const { recipes } = useContext(RecipesContext);

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default MainCocktailsRecipes;
