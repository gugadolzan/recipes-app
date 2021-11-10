import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

import data from '../services/data';

const { Provider } = RecipesContext;
const { drinks, meals } = data;

function RecipesProvider({ children }) {
  const [mealsRecipes, setMealsRecipes] = useState(meals);
  const [cocktailsRecipes, setCocktailsRecipes] = useState(drinks);
  const [loading, setLoading] = useState(false);

  const value = {
    cocktailsRecipes,
    mealsRecipes,
    loading,
    setCocktailsRecipes,
    setLoading,
    setMealsRecipes,
  };

  return <Provider value={ value }>{children}</Provider>;
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
