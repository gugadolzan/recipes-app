import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import CategoriesFilters from '../../components/CategoriesFilters';
import FavoriteRecipeCard from './FavoriteRecipeCard';

import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
    );
  }, []);

  return (
    <>
      <Header title="Receitas Favoritas" />
      {favoriteRecipes.length === 0 ? (
        <div className="header-footer-padding main-background">
          <div className="no-recipes-container">
            <p>You have not favorite any recipes yet!</p>
            <div>
              <Link to="/comidas">Return</Link>
              <span> to the recipes page and favorite some!</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-footer-padding main-background">
          <CategoriesFilters
            onClick={ ({ target }) => setFilter(target.value) }
          />
          <div className="recipes-container">
            {favoriteRecipes
              .filter(({ type }) => type.includes(filter))
              .map((recipe, index) => (
                <FavoriteRecipeCard key={ index } index={ index } recipe={ recipe } />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteRecipes;
