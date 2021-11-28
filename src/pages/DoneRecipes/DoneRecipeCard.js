import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipeCard({ index, recipe }) {
  const {
    alcoholicOrNot,
    area,
    category,
    doneDate,
    id,
    image,
    name,
    tags,
    type,
  } = recipe;
  const recipeDetailsLink = type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  return (
    <div className="done-recipe-card">
      <Link to={ recipeDetailsLink }>
        <img
          alt={ name }
          className="done-recipes-card-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
        />
      </Link>
      <div className="done-recipe-card-info">
        <p
          className="done-recipe-card-top-text"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
        </p>
        <div className="done-recipe-card-share">
          <input
            alt="Share button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              setShowCopyToClipboard(true);
              copy(
                window.location.href.replace(
                  '/receitas-feitas',
                  `${recipeDetailsLink}`,
                ),
              );
            } }
            src={ shareIcon }
            type="image"
          />
          {showCopyToClipboard && <span>Link copiado!</span>}
        </div>
        <Link
          className="done-recipe-card-name"
          data-testid={ `${index}-horizontal-name` }
          to={ recipeDetailsLink }
        >
          {name}
        </Link>
        <p
          className="done-recipe-card-done-date"
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Done in: ${doneDate}`}
        </p>
        {type === 'comida' && (
          <div className="done-recipe-card-tags-container">
            {tags.map((tagName, tagIndex) => (
              <span
                className="done-recipe-card-tag"
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagIndex }
              >
                {tagName}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoneRecipeCard;
