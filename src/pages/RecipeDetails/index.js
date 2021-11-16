import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import methods from '../../services/api';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';

import './RecipeDetails.css';

const { lookup, searchBy } = methods;
const MAX_RECOMENDATIONS = 6;
const RECIPE_KEYS = {
  meals: {
    path: 'comidas',
    recipeId: 'idMeal',
    thumb: 'strMealThumb',
    title: 'strMeal',
  },
  drinks: {
    path: 'bebidas',
    recipeId: 'idDrink',
    thumb: 'strDrinkThumb',
    title: 'strDrink',
  },
};

function RecipeDetails({ match: { params } }) {
  const { pathname } = useLocation();
  const [recipeType, reverseType] = pathname.includes('/comidas')
    ? ['meals', 'drinks']
    : ['drinks', 'meals'];

  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);

  // fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await lookup.details(recipeType, params.id);
      setRecipe(response[recipeType][0]);
      setLoading(false);
    };
    fetchRecipe();
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
      <RecipeHeader
        category={
          pathname.includes('/comidas')
            ? recipe.strCategory
            : recipe.strAlcoholic
        }
        image={ recipe[RECIPE_KEYS[recipeType].thumb] }
        title={ recipe[RECIPE_KEYS[recipeType].title] }
      />

      <input
        alt="share"
        data-testid="share-btn"
        // onClick={ handleShare }
        src={ shareIcon }
        type="image"
      />
      {hidden && <span>Link Copiado</span>}
      <input
        alt="favorite"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        type="image"
      />

      <RecipeIngredients
        ingredients={ recipeIngredients }
        measures={ ingredientsMeasures }
      />
      <h2 data-testid="instructions">Instructions</h2>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {pathname.includes('/comidas') && (
        <iframe
          data-testid="video"
          title="How to"
          src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
        />
      )}

      <h3>Recomendations</h3>
      <div className="recomendations-container">
        {recomendations
          .slice(0, MAX_RECOMENDATIONS)
          .map((recomendation, index) => (
            <Link
              className="recipe-card"
              data-testid={ `${index}-recomendation-card` }
              key={ recomendation[RECIPE_KEYS[reverseType].recipeId] }
              to={ `/${RECIPE_KEYS[reverseType].recipeId}/${
                recomendation[RECIPE_KEYS[reverseType].recipeId]
              }` }
            >
              <img
                alt={ recomendation[RECIPE_KEYS[reverseType].title] }
                className="recipe-card-image"
                data-testid={ `${index}-card-img` }
                src={ recomendation[RECIPE_KEYS[reverseType].thumb] }
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                {recomendation[RECIPE_KEYS[reverseType].title]}
              </h3>
            </Link>
          ))}
      </div>

      <button
        data-testid="start-recipe-btn"
        // onClick={redireciona para tela de in progress}
        type="button"
      >
        Iniciar Receita
      </button>
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
