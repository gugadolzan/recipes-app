import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import methods from '../../services/api';

import RecipeIngredients from './RecipeIngredients';
import Recomendations from './Recomendations';
import ShareAndFavorite from './ShareAndFavorite';

import './RecipeDetails.css';

const { lookup, searchBy } = methods;

function RecipeDetails({ match: { params } }) {
  const { pathname } = useLocation();
  const [recipeType, reverseType, thumb, title] = pathname.includes('/comidas')
    ? ['meals', 'drinks', 'strMealThumb', 'strMeal']
    : ['drinks', 'meals', 'strDrinkThumb', 'strDrink'];

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);

  const inProgressRecipesStorage = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  // necessary to avoid cypress tests to fail
  const inProgressRecipes = inProgressRecipesStorage
    ? inProgressRecipesStorage[
      pathname.includes('/comidas') ? 'meals' : 'cocktails'
    ] // sometimes the key is 'drinks' and sometimes 'cocktails'... :clown:
    : {};

  // fetch recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await lookup.details(recipeType, params.id);
      setRecipe(response[recipeType][0]);
      setLoading(false);
    };
    fetchRecipeDetails();
  }, [params.id, recipeType]);
  // fetch recomendations
  useEffect(() => {
    const fetchRecomendations = async () => {
      const response = await searchBy.name(reverseType);
      setRecomendations(response[reverseType]);
    };
    fetchRecomendations();
  }, [reverseType]);

  const recipeIngredients = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strIngredient') && curr[1],
  );
  const ingredientsMeasures = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strMeasure') && curr[1],
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="recipe-details">
      <img
        alt={ recipe[title] }
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ recipe[thumb] }
      />
      <h1 data-testid="recipe-title">{recipe[title]}</h1>
      <h3 data-testid="recipe-category">
        {pathname.includes('/comidas')
          ? recipe.strCategory
          : recipe.strAlcoholic}
      </h3>

      <ShareAndFavorite recipe={ recipe } />

      <RecipeIngredients
        ingredients={ recipeIngredients }
        measures={ ingredientsMeasures }
      />

      <h2 data-testid="instructions">Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {pathname.includes('/comidas') && recipe.strYoutube && (
        <iframe
          data-testid="video"
          title="How to"
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
        />
      )}

      <Recomendations recomendations={ recomendations } />

      <Link
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        to={ `${pathname}/in-progress` }
      >
        {inProgressRecipes[params.id] ? 'Continuar Receita' : 'Iniciar Receita'}
      </Link>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
