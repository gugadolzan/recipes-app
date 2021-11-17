import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

const { Provider } = RecipesContext;

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const value = { recipes, setRecipes };

  return <Provider value={ value }>{children}</Provider>;
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
