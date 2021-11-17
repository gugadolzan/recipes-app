import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import { fetchIngredientesListCocktails } from '../../services/api';

function ExploreCocktailsByIngredient() {
  const [IngredientesListCocktails, setIngredientesListCocktails] = useState([]);

  const renderCards = () => (<RecipeCard
    ingredientesList={ IngredientesListCocktails }
  />);

  const getDataButton = () => {
    fetchIngredientesListCocktails(setIngredientesListCocktails);
  };

  useEffect(getDataButton, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {renderCards()}
      <Footer />
    </div>
  );
}
export default ExploreCocktailsByIngredient;
