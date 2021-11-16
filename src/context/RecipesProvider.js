import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

const { Provider } = RecipesContext;

function RecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const value = {
    drinksRecipes,
    loading,
    mealsRecipes,
    recipes,
    setDrinksRecipes,
    setLoading,
    setMealsRecipes,
    setRecipes,
  };

  return <Provider value={ value }>{children}</Provider>;
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
