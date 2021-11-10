import React, { useContext, useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import { methods } from '../../services/api';

import './MainMealsRecipes.css';

function MainMealsRecipes() {
  const { mealsRecipes } = useContext(RecipesContext);

  const [mealCategories, setMealCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await methods.listAllCategories('mealDB');
      const key = Object.keys(response);
      const categories = response[key].map((category) => category.strCategory);
      setMealCategories(categories);
    };
    fetchCategories();
  }, []);

  const MAX_RECIPES = 12;

  return (
    <>
      <Header />
      <div className="meals-recipes-container">
        {mealsRecipes
          .slice(0, MAX_RECIPES)
          .map(({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ idMeal }
              id={ idMeal }
              image={ strMealThumb }
              index={ index }
              title={ strMeal }
            />
          ))}
      </div>
      <Footer />
    </>
  );
}

export default MainMealsRecipes;
