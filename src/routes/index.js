import React from 'react';
import { Route, Switch } from 'react-router';
import {
  Login,
  MainMealsRecipes,
  MainCocktailsRecipes,
  MealRecipeDetails,
  CocktailRecipeDetails,
  InProgressFoodRecipe,
  InProgressDrinkRecipe,
  Explore,
  ExploreMeals,
  ExploreCocktails,
  ExploreMealsByIngredient,
  ExploreCocktailsByIngredient,
  ExploreMealsByArea,
  Profile,
  DoneRecipes,
  FavoriteRecipes,
  NotFound,
} from '../pages';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainMealsRecipes } />
      <Route exact path="/bebidas" component={ MainCocktailsRecipes } />
      <Route exact path="/comidasdetails" component={ MealRecipeDetails } />
      <Route exact path="/bebidas/:id" component={ CocktailRecipeDetails } />
      <Route path="/comidas/:id/in-progress" component={ InProgressFoodRecipe } />
      <Route
        path="/bebidas/:id/in-progress"
        component={ InProgressDrinkRecipe }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar/bebidas" component={ ExploreCocktails } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreMealsByIngredient }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreCocktailsByIngredient }
      />
      <Route
        path="/explorar/comidas/area"
        component={ ExploreMealsByArea }
      />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
