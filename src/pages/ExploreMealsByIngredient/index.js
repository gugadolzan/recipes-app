import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import { fetchIngredientesListMeal } from '../../services/api';

function ExploreMealsByIngredient() {
  const [IngredientesListMeal, setIngredientesListMeal] = useState([]);

  const renderCards = () => (<RecipeCard
    ingredientesList={ IngredientesListMeal }
  />);

  const getDataButton = () => {
    fetchIngredientesListMeal(setIngredientesListMeal);
  };
  useEffect(getDataButton, []);
  return (
    <>
      <Header title="Explorar Ingredientes" />
      {renderCards()}
      <Footer />
    </>
  );
}

export default ExploreMealsByIngredient;
