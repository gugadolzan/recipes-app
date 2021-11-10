import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';
import { methods } from '../../services/api';

import './MainPage.css';

const { filterByCategory } = methods;
const MAX_CATEGORIES = 5;
const MAX_RECIPES = 12;

function MainPage() {
  const { cocktailsRecipes, mealsRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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

  const handleCategoryClick = async (category) => {
    if (filteredRecipes.length === 0 || filter !== category) {
      const apiKey = pathname === '/comidas' ? 'mealDB' : 'cocktailDB';
      const response = await filterByCategory(apiKey, category);
      const recipeKey = Object.keys(response);

      setFilter(category);
      setFilteredRecipes(response[recipeKey].slice(0, MAX_RECIPES));
    } else {
      setFilteredRecipes([]);
    }
  };

  const renderRecipeCard = (recipe, index) => (
    <RecipeCard
      index={ index }
      key={ pathname === '/comidas' ? recipe.idMeal : recipe.idDrink }
      recipe={ recipe }
    />
  );

  return (
    <>
      <Header />
      <div>
        {categories.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ category }
            onClick={ ({ target }) => handleCategoryClick(target.innerText) }
            type="button"
            value={ category }
          >
            {category}
          </button>
        ))}
      </div>
      <div className="meals-recipes-container">
        {filteredRecipes.length === 0
          ? recipes.map((recipe, index) => renderRecipeCard(recipe, index))
          : filteredRecipes.map((recipe, index) => renderRecipeCard(recipe, index))}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
