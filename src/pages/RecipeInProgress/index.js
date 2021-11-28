import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import FinishRecipeButton from './FinishRecipeButton';
import ShareAndFavorite from '../../components/ShareAndFavorite';
import methods from '../../services/api';

const { lookup } = methods;

function RecipeInProgress({ match: { params } }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [recipeType, storageType, thumb, title] = pathname.includes('/comidas')
    ? ['meals', 'meals', 'strMealThumb', 'strMeal']
    : ['drinks', 'cocktails', 'strDrinkThumb', 'strDrink'];

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [inProgress, setInProgress] = useState([]);

  // fetch recipe details
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await lookup.details(recipeType, params.id);
      setRecipe(response[recipeType][0]);
      setLoading(false);
    };
    fetchRecipeDetails();
  }, [params.id, recipeType]);

  useEffect(() => {
    const inProgressRecipesStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    // create localStorage if it doesn't exist
    if (!inProgressRecipesStorage) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          cocktails: {},
          meals: {},
        }),
      );
    }
    // get in progress recipe from localStorage
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    )[storageType];

    setInProgress(inProgressRecipes[params.id] || []);
  }, [params.id, storageType]);

  const recipeIngredients = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strIngredient') && curr[1],
  );
  const ingredientsMeasures = Object.entries(recipe).filter(
    (curr) => curr[0].includes('strMeasure') && curr[1],
  );

  const handleProgress = ({ checked, value }) => {
    const inProgressRecipesStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );

    let newInProgressRecipes;

    if (checked) {
      newInProgressRecipes = {
        ...inProgressRecipesStorage,
        [storageType]: {
          ...inProgressRecipesStorage[storageType],
          [params.id]: [...inProgress, value],
        },
      };
    } else {
      newInProgressRecipes = {
        ...inProgressRecipesStorage,
        [storageType]: {
          ...inProgressRecipesStorage[storageType],
          [params.id]: inProgress.filter((curr) => curr !== value),
        },
      };
    }

    setInProgress(newInProgressRecipes[storageType][params.id]);
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(newInProgressRecipes),
    );
  };

  if (loading) return <div className="loader" />;

  return (
    <div className="recipe-details">
      <img
        alt={ recipe[title] }
        className="recipe-photo"
        data-testid="recipe-photo"
        src={ recipe[thumb] }
      />
      <div className="recipe-header">
        <div className="recipe-title-container">
          <h1 data-testid="recipe-title">{recipe[title]}</h1>
          <h3 data-testid="recipe-category">
            {pathname.includes('/comidas')
              ? recipe.strCategory
              : recipe.strAlcoholic}
          </h3>
        </div>
        <ShareAndFavorite recipe={ recipe } />
      </div>
      <h2 className="recipe-title">Ingredients</h2>
      <div className="recipe-details-text-container">
        {recipeIngredients.map((ingredient, index) => (
          // ingredient[0] = strIngredient1, strIngredient2, ...
          // ingredient[1] = ingredient name
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ ingredient[0] }
            key={ index }
          >
            <input
              checked={ inProgress.includes(ingredient[0]) }
              type="checkbox"
              id={ ingredient[0] }
              onChange={ ({ target }) => handleProgress(target) }
              value={ ingredient[0] }
            />
            {ingredient[1]}
            {ingredientsMeasures[index] && (
              <span>{` - ${ingredientsMeasures[index][1]}`}</span>
            )}
          </label>
        ))}
      </div>
      <h2 className="recipe-title" data-testid="instructions">
        Instructions
      </h2>
      <p
        className="recipe-details-text-container recipe-instructions"
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>
      <FinishRecipeButton
        isDisabled={ recipeIngredients.length !== inProgress.length }
        recipe={ recipe }
      />
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
