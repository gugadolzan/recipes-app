import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import methods from '../../services/api';

function ExploreMealsByArea() {
  const { mealsRecipes } = useContext(RecipesContext);
  const context = useContext(RecipesContext);
  console.log(mealsRecipes);
  console.log(context);

  const { listAllAreas, filterByArea } = methods;

  const [areas, setAreas] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await listAllAreas();
      const key = Object.keys(response);
      const keyAreas = response[key].map((origin) => origin.strArea);
      setAreas(keyAreas);
    };
    fetchData();
  }, []);

  const handleChange = async (area) => {
    if (area === 'All') {
      setFilteredRecipes([]);
    } else {
      const response = await filterByArea(area);
      setFilteredRecipes(response.meals);
    }
  };

  const renderRecipeCard = (recipe, index) => (
    <RecipeCard index={ index } key={ recipe.idMeal } recipe={ recipe } />
  );

  return (
    <>
      <Header />
      <div>
        <select
          onChange={ (e) => handleChange(e.target.value) }
          data-testid="explore-by-area-dropdown"
        >
          <option value="All" data-testid="all-option">All</option>
          {areas.map((area) => (
            <option
              data-testid={ `${area}-option` }
              key={ area }
              value={ area }
            >
              {area}
            </option>
          ))}
        </select>
        <div className="meals-recipes-container">
          {filteredRecipes.length === 0
            ? mealsRecipes.map((recipe, index) => renderRecipeCard(recipe, index))
            : filteredRecipes.map((recipe, index) => renderRecipeCard(recipe, index))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreMealsByArea;
