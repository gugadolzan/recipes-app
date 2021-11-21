import React from 'react';
import PropTypes from 'prop-types';

import RecipeCard from '../../components/RecipeCard';

const MAX_RECOMENDATIONS = 6;

export default function Recomendations({ recomendations }) {
  return (
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
  );
}

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
