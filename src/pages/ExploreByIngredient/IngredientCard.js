import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import RecipesContext from '../../context/RecipesContext';

const THUMBNAIL_IMAGE_URL = {
  meals: (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`,
  drinks: (name) => `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`,
};

export default function IngredientCard({ index, ingredient, recipeType }) {
  const { setIngredient } = useContext(RecipesContext);
  const history = useHistory();
  const name = ingredient[
    Object.keys(ingredient).find((key) => key.includes('strIngredient'))
  ];
  const imageUrl = THUMBNAIL_IMAGE_URL[recipeType](name);

  const handleClick = () => {
    setIngredient(name);
    history.push(recipeType === 'meals' ? '/comidas' : '/bebidas');
  };

  return (
    <div
      className="ingredient-card"
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleClick }
      onKeyPress={ handleClick }
      role="button"
      tabIndex={ 0 }
    >
      <img alt={ name } data-testid={ `${index}-card-img` } src={ imageUrl } />
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  recipeType: PropTypes.string.isRequired,
};
