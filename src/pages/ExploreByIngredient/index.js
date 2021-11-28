import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import IngredientCard from './IngredientCard';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import methods from '../../services/api';

import './ExploreByIngredient.css';

const { listAll } = methods;
const MAX_INGREDIENTS = 12;

function ExploreByIngredient() {
  const { pathname } = useLocation();
  const [recipeType] = pathname.includes('comidas') ? ['meals'] : ['drinks'];
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await listAll.ingredients(recipeType);
      setIngredients(response[recipeType].slice(0, MAX_INGREDIENTS));
      setLoading(false);
    };
    fetchIngredients();
  }, [recipeType]);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="header-footer-padding main-background">
        {loading ? (
          <div className="loader" />
        ) : (
          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <IngredientCard
                key={ index }
                index={ index }
                ingredient={ ingredient }
                recipeType={ recipeType }
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ExploreByIngredient;

// --------------------------------

// function ExploreCocktailsByIngredient() {
//   const [IngredientesListCocktails, setIngredientesListCocktails] = useState(
//     [],
//   );

//   const renderCards = () => (
//     <RecipeCard ingredientesList={ IngredientesListCocktails } />
//   );

//   const getDataButton = () => {
//     fetchIngredientesListCocktails(setIngredientesListCocktails);
//   };

//   useEffect(getDataButton, []);
//   return (
//     <div>
//       <Header title="Explorar Ingredientes" />
//       {renderCards()}
//       <Footer />
//     </div>
//   );
// }

// --------------------------------

// function ExploreMealsByIngredient() {
//   const [IngredientesListMeal, setIngredientesListMeal] = useState([]);

//   const renderCards = () => (
//     <RecipeCard ingredientesList={ IngredientesListMeal } />
//   );

//   const getDataButton = () => {
//     fetchIngredientesListMeal(setIngredientesListMeal);
//   };
//   useEffect(getDataButton, []);
//   return (
//     <>
//       <Header title="Explorar Ingredientes" />
//       {renderCards()}
//       <Footer />
//     </>
//   );
// }
