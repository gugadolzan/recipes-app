import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreByIngredient() {
  return (
    <>
      <Header title="Explorar Ingredientes" />
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
