import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../../components/Header';

import './DoneRecipes.css';

const FILTER_BUTTONS = [
  {
    dataTestId: 'filter-by-all-btn',
    text: 'All',
    value: 'All',
  },
  {
    dataTestId: 'filter-by-food-btn',
    text: 'Food',
    value: 'Meals',
  },
  {
    dataTestId: 'filter-by-drink-btn',
    text: 'Drinks',
    value: 'Drinks',
  },
];

function DoneRecipes() {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // React.useEffect(() => {
  //   const cocktails = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   return () => {

  //   };
  // }, []);

  console.log(filter);

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
        <img
          className="done-recipes-image"
          data-testid="0-horizontal-image"
          src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
          alt=""
        />
        <p data-testid="0-horizontal-top-text">Italian - Vegetarian</p>
        <p data-testid="0-horizontal-name">Spicy Arrabiata Penne</p>
        <div data-testid="0-horizontal-done-date">Texto da data da receita</div>
        <button
          type="button"
          data-testid="0-horizontal-share-btn"
          src="/images/shareIcon.svg"
          onClick={ async () => {
            setLoading(true);
            copy('http://localhost:3000/comidas/52771');
            copy(window.location.href);
          } }
        >
          share
        </button>
        {loading && <p>Link copiado!</p>}
        <div data-testid="0-Pasta-horizontal-tag"> Pasta</div>
        <div data-testid="0-Curry-horizontal-tag">Curry</div>
        <p
          data-testid="1-horizontal-image"
          src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
        >
          Link copiado
        </p>
        <div data-testid="1-horizontal-done-date"> 23/06/2020</div>
        <div data-testid="1-horizontal-top-text">Alcoholic</div>
        <div data-testid="1-horizontal-name">Aquamarine</div>
        <div data-testid="1-horizontal-share-btn" src="images/shareIcon.svg" />
        <div data-testid="0-horizontal-done-date"> 23/06/2020</div>
      </div>
    </>
  );
}

export default DoneRecipes;
