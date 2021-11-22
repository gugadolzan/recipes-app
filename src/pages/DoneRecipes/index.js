import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoneRecipeCard from './DoneRecipeCard';

import './DoneRecipes.css';

const FILTER_BUTTONS = [
  {
    dataTestId: 'filter-by-all-btn',
    text: 'All',
    value: '',
  },
  {
    dataTestId: 'filter-by-food-btn',
    text: 'Food',
    value: 'comida',
  },
  {
    dataTestId: 'filter-by-drink-btn',
    text: 'Drinks',
    value: 'bebida',
  },
];

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(doneRecipesStorage);
  }, []);

  if (doneRecipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header title="Receitas Feitas" />
      <div className="header-footer-padding main-background">
        <div className="category-filter-container">
          {FILTER_BUTTONS.map((button) => (
            <button
              className="category-filter"
              data-testid={ button.dataTestId }
              key={ button.dataTestId }
              onClick={ ({ target }) => setFilter(target.value) }
              type="button"
              value={ button.value }
            >
              {button.text}
            </button>
          ))}
        </div>
        <div className="done-recipes-container">
          {doneRecipes
            .filter(({ type }) => type.includes(filter))
            .map((recipe, index) => (
              <DoneRecipeCard key={ index } index={ index } recipe={ recipe } />
            ))}
        </div>
      </div>
    </>
  );
}

export default DoneRecipes;
