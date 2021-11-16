import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const MAX_RECOMENDATIONS = 6;

export default function Recomendations({ recomendations }) {
  const { pathname } = useLocation();
  const [recipeId, path, thumb, title] = pathname.includes('/comidas')
    ? ['idDrink', 'bebidas', 'strDrinkThumb', 'strDrink']
    : ['idMeal', 'comidas', 'strMealThumb', 'strMeal'];
  return (
    <>
      <h3>Recomendations</h3>
      <div className="recomendations-container">
        {recomendations
          .slice(0, MAX_RECOMENDATIONS)
          .map((recomendation, index) => (
            <Link
              className="recipe-card"
              data-testid={ `${index}-recomendation-card` }
              key={ recomendation[recipeId] }
              to={ `/${path}/${recomendation[recipeId]}` }
            >
              <img
                alt={ recomendation[title] }
                className="recipe-card-image"
                data-testid={ `${index}-card-img` }
                src={ recomendation[thumb] }
              />
              <h3 data-testid={ `${index}-recomendation-title` }>
                {recomendation[title]}
              </h3>
            </Link>
          ))}
      </div>
    </>
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
