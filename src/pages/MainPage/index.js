import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';
import { methods } from '../../services/api';

import './MainPage.css';

function MainPage() {
  const MAX_CATEGORIES = 5;
  const MAX_RECIPES = 12;

  const { cocktailsRecipes, mealsRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);

  const recipes = pathname === '/comidas'
    ? mealsRecipes.slice(0, MAX_RECIPES)
    : cocktailsRecipes.slice(0, MAX_RECIPES);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = pathname === '/comidas'
        ? await methods.listAllCategories('mealDB')
        : await methods.listAllCategories('cocktailDB');

      const key = Object.keys(response);

      const keyCategories = response[key]
        .map((category) => category.strCategory)
        .slice(0, MAX_CATEGORIES);

      setCategories(keyCategories);
    };

    fetchCategories();
  }, [pathname]);

  return (
    <>
      <Header />
      <div>
        {categories.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ category }
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="meals-recipes-container">
        {recipes.map((recipe, index) => (
          <RecipeCard
            index={ index }
            key={ pathname === '/comidas' ? recipe.idMeal : recipe.idDrink }
            recipe={ recipe }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
