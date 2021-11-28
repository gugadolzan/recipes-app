import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function FinishRecipeButton({ isDisabled, recipe }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [idKey, imageKey, nameKey, type] = pathname.includes('/comidas')
    ? ['idMeal', 'strMealThumb', 'strMeal', 'comida']
    : ['idDrink', 'strDrinkThumb', 'strDrink', 'bebida'];

  const finishRecipe = () => {
    const { strAlcoholic, strArea, strCategory, strTags } = recipe;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newDoneRecipes = [
      ...doneRecipes,
      {
        id: recipe[idKey],
        type,
        area: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic || '',
        name: recipe[nameKey],
        image: recipe[imageKey],
        doneDate: new Date().toLocaleDateString('pt-BR'),
        tags: strTags ? strTags.split(',') : [],
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    history.push('/receitas-feitas');
  };

  return (
    <button
      className="start-recipe-btn"
      data-testid="finish-recipe-btn"
      disabled={ isDisabled }
      onClick={ finishRecipe }
      type="button"
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};
