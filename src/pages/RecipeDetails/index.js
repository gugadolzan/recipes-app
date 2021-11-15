import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import methods from '../../services/api';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import './RecipeDetails.css';

const { lookupDetails, searchBy } = methods;

const MAX_RECOMENDATIONS = 6;

function RecipeDetails({ match: { params } }) {
  const { pathname } = useLocation();

  const [id, recipeType, thumb, title] = pathname.includes('/comidas')
    ? ['idMeal', 'meals', 'strMealThumb', 'strMeal']
    : ['idDrink', 'drinks', 'strDrinkThumb', 'strDrink'];
  const [
    reverseId,
    reverseRecipeType,
    reverseThumb,
    reverseTitle,
    reversePath,
  ] = recipeType === 'meals'
    ? ['idDrink', 'drinks', 'strDrinkThumb', 'strDrink', 'bebidas']
    : ['idMeal', 'meals', 'strMealThumb', 'strMeal', 'comidas'];

  const [hidden, setHidden] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await lookupDetails(recipeType, params.id);
      setRecipe(response[recipeType][0]);
    };

    fetchRecipe();
  }, [params.id, recipeType]);
  useEffect(() => {
    const fetchRecomendations = async () => {
      const response = await searchBy.name(reverseRecipeType);
      setRecomendations(response[reverseRecipeType]);
    };

    fetchRecomendations();
  }, [reverseRecipeType]);

  const { strCategory, strInstructions, strYoutube } = recipe;

  const recipeIngredients = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strIngredient') && curr[1],
  );
  const ingredientsMeasures = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strMeasure') && curr[1],
  );

  // function handleShare() {
  //   setHidden(true);
  // }

  // function srcLiked() {
  //   if (!localStorage.getItem('favoriteRecipes')) return whiteHeartIcon;
  //   return JSON
  //     .parse(localStorage
  //       .getItem('favoriteRecipes'))
  //     .some((item) => item.id === obj.id) ? blackHeartIcon : whiteHeartIcon;
  // };

  return (
    <div className="recipe-details">
      <img
        alt={ recipe[title] }
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ recipe[thumb] }
      />

      <h2 data-testid="recipe-title">{recipe[title]}</h2>

      <h4 data-testid="recipe-category">
        {pathname.includes('/comidas') ? strCategory : recipe.strAlcoholic}
      </h4>

      {recipeIngredients.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient[1] }
        >
          <span>{`- ${ingredient[1]}`}</span>
          {ingredientsMeasures[index] && (
            <span>{` - ${ingredientsMeasures[index][1]}`}</span>
          )}
        </p>
      ))}

      <h3 data-testid="instructions">Instruções</h3>
      <h3 data-testid="instructions">{strInstructions}</h3>

      {/* set loading */}
      {strYoutube && (
        <iframe
          data-testid="video"
          title="How to"
          src={ strYoutube.replace('watch?v=', 'embed/') }
        />
      )}
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

      <h3>Recomendações</h3>
      <div className="recomendations-container">
        {recomendations
          .slice(0, MAX_RECOMENDATIONS)
          .map((recomendation, index) => (
            <Link
              className="recipe-card"
              data-testid={ `${index}-recomendation-card` }
              key={ recomendation[reverseId] }
              to={ `/${reversePath}/${recomendation[reverseId]}` }
            >
              <img
                alt={ recomendation[reverseTitle] }
                className="recipe-card-image"
                data-testid={ `${index}-card-img` }
                src={ recomendation[reverseThumb] }
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                {recomendation[reverseTitle]}
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
