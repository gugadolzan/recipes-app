import React from 'react';
import { Route, Switch } from 'react-router';
import {
  Login,
  MainPage,
  RecipeDetails,
  RecipeInProgress,
  Explore,
  ExploreRecipes,
  ExploreByIngredient,
  ExploreByArea,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
  NotFound,
} from '../pages';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/bebidas" component={ MainPage } />
      <Route exact path="/comidas/:id" component={ RecipeDetails } />
      <Route exact path="/bebidas/:id" component={ RecipeDetails } />
      <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreRecipes } />
      <Route exact path="/explorar/bebidas" component={ ExploreRecipes } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreByIngredient }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreByIngredient }
      />
      <Route path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
