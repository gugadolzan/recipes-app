import React from 'react';

import copy from 'clipboard-copy';
import Header from '../../components/Header';
// const copy = require('clipboard-copy');

function DoneRecipes() {
  const [load, setLoad] = React.useState(false);
  // React.useEffect(() => {
  //   const cocktails = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   return () => {

  //   };
  // }, []);
  return (
    <>

      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">click</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>

      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <img data-testid="0-horizontal-image" src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="" />
      <p data-testid="0-horizontal-top-text">Italian - Vegetarian</p>
      <p data-testid="0-horizontal-name">Spicy Arrabiata Penne</p>
      <div data-testid="0-horizontal-done-date">Texto da data da receita</div>
      <button
        type="button"
        data-testid="0-horizontal-share-btn"
        src="/images/shareIcon.svg"
        onClick={ async () => {
          setLoad(true);
          copy('http://localhost:3000/comidas/52771');
          copy(window.location.href);
        } }
      >
        share
      </button>
      { load && <p>Link copiado!</p>}
      <div data-testid="0-Pasta-horizontal-tag">  Pasta</div>

      <div data-testid="0-Curry-horizontal-tag">Curry</div>
      <p data-testid="1-horizontal-image" src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg">Link copiado</p>
      <div data-testid="1-horizontal-done-date"> 23/06/2020</div>
      <div data-testid="1-horizontal-top-text">Alcoholic</div>
      <div data-testid="1-horizontal-name">Aquamarine</div>
      <div data-testid="1-horizontal-share-btn" src="images/shareIcon.svg" />
      <div data-testid="0-horizontal-done-date"> 23/06/2020</div>

    </>
  );
}

export default DoneRecipes;
