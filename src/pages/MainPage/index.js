import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';
import methods from '../../services/api';

import './MainPage.css';

const { filterBy, listAll, searchBy } = methods;
const MAX_CATEGORIES = 5;
const MAX_RECIPES = 12;

function MainPage() {
  const { ingredient, setIngredient, recipes, setRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const [headerTitle, recipeType] = pathname.includes('/comidas')
    ? ['Comidas', 'meals']
    : ['Bebidas', 'drinks'];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = ingredient
        ? await searchBy.ingredient(recipeType, ingredient)
        : await searchBy.name(recipeType);
      // setIngredient('');
      // setRecipes(response[recipeType]);
      if (response) {
        setRecipes(response[recipeType]);
        setLoading(false);
      }
    };
    fetchData();
  }, [ingredient, recipeType, setRecipes]);

  useEffect(() => () => setIngredient(''), [recipeType, setIngredient]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await listAll.categories(recipeType);
      const categoryKeys = response[recipeType]
        .map(({ strCategory }) => strCategory)
        .slice(0, MAX_CATEGORIES);
      setCategories(['All', ...categoryKeys]);
    };
    fetchCategories();
  }, [recipeType]);

  const handleCategoryClick = async (category) => {
    let response;
    setLoading(true);

    if (category !== filter && category !== 'All') {
      response = await filterBy.category(recipeType, category);
    } else {
      response = await searchBy.name(recipeType);
    }

    setFilter((prevState) => (prevState === category ? 'All' : category));
    setRecipes(response[recipeType]);
    setLoading(false);
  };

  return (
    <>
      <Header title={ headerTitle } />
      <div className="header-footer-padding main-background">
        <div className="category-filter-container">
          {categories.map((category) => (
            <button
              className="category-filter"
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
        {loading ? (
          <div className="loader" />
        ) : (
          <div className="recipes-container">
            {recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
              <RecipeCard index={ index } key={ index } recipe={ recipe } />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
