import React from 'react';
import PropTypes from 'prop-types';

import './Recomendations.css';
import RecipeCard from '../../components/RecipeCard';

const MAX_RECOMENDATIONS = 6;

export default function Recomendations({ recomendations }) {
  return (
    <>
      <h3>Recomendations</h3>
      <div className="recomendations-container">
        {recomendations
          .slice(0, MAX_RECOMENDATIONS)
          .map((recomendation, index) => (
            <RecipeCard
              dataTestid="recomendation-card"
              index={ index }
              key={ index }
              recipe={ recomendation }
              titleTestid="recomendation-title"
            />
          ))}
      </div>
    </>
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
