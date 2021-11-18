import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

import methods from '../../services/api';

const { lookup } = methods;

function RecipeInProgress({ match: { params } }) {
  const { pathname } = useLocation();
  const [recipeType] = pathname.includes('/comidas') ? ['meals'] : ['drinks'];

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await lookup.details(recipeType, params.id);
      setRecipe(response[recipeType][0]);
      setLoading(false);
    };
    fetchRecipeDetails();
  }, [params.id, recipeType]);

  console.log(recipe);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>RecipeInProgress</h1>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeInProgress;
