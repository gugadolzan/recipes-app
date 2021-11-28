import React from 'react';
import { useHistory } from 'react-router';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import methods from '../../services/api';

import './ExploreRecipes.css';

const { lookup } = methods;

function ExploreRecipes() {
  const history = useHistory();
  const { pathname } = history.location;

  const [headerTitle, path, recipeId, recipeType] = pathname.includes(
    '/comidas',
  )
    ? ['Explorar Comidas', 'comidas', 'idMeal', 'meals']
    : ['Explorar Bebidas', 'bebidas', 'idDrink', 'drinks'];

  const handleSurprise = async () => {
    const response = await lookup.random(recipeType);
    const id = response[recipeType][0][recipeId];

    history.push(`/${path}/${id}`);
  };

  return (
    <>
      <Header title={ headerTitle } />
      <div
        className={
          path === 'comidas'
            ? 'explore-meals-background'
            : 'explore-drinks-background'
        }
      >
        <div className="header-footer-padding explore-recipes-links">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push(`/explorar/${path}/ingredientes`) }
          >
            Por Ingredientes
          </button>
          {pathname.includes('/comidas') && (
            <button
              type="button"
              data-testid="explore-by-area"
              onClick={ () => history.push('/explorar/comidas/area') }
            >
              Por Local de Origem
            </button>
          )}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ handleSurprise }
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreRecipes;
