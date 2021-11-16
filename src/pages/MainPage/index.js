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
  const { recipes, setRecipes, loading, setLoading } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('All');

  const [id, recipeType] = pathname === '/comidas'
    ? ['idMeal', 'meals']
    : ['idDrink', 'drinks'];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await searchBy.name(recipeType);
      setRecipes(response[recipeType]);
      setLoading(false);
    };
    fetchData();
  }, [recipeType, setLoading, setRecipes]);

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
      setFilter(category);
      response = await filterBy.category(recipeType, category);
    } else {
      setFilter('All');
      response = await searchBy.name(recipeType);
    }

    setRecipes(response[recipeType]);
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div>Carregando...</div>
        <Footer />
      </>
    );
  }

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
        {recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
          <RecipeCard index={ index } key={ recipe[id] } recipe={ recipe } />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
