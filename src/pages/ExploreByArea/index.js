import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import RecipesContext from '../../context/RecipesContext';

import methods from '../../services/api';

import './ExploreByArea.css';

const { filterBy, listAll, searchBy } = methods;
const MAX_RECIPES = 12;

function ExploreByArea() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const { meals } = await searchBy.name('meals');
      setRecipes((prevState) => (prevState.length === 0 ? meals : prevState));
      setLoading(false);
    };
    fetchData();
  }, [setLoading, setRecipes]);

  useEffect(() => {
    const fetchData = async () => {
      const { meals } = await listAll.areas();
      const areaList = meals.map(({ strArea }) => strArea);
      setAreas(['All', ...areaList]);
    };
    fetchData();
  }, []);

  const handleAreaChange = async (area) => {
    let response;
    setLoading(true);

    if (area === 'All') {
      response = await searchBy.name('meals');
    } else {
      response = await filterBy.area(area);
    }

    setSelectedArea(area);
    setRecipes(response.meals);
    setLoading(false);
  };

  return (
    <>
      <Header title="Explorar Origem" />
      <div className="header-footer-padding main-background">
        <select
          className="explore-by-area-dropdown"
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => handleAreaChange(target.value) }
          value={ selectedArea }
        >
          {areas.map((area) => (
            <option data-testid={ `${area}-option` } key={ area } value={ area }>
              {area}
            </option>
          ))}
        </select>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="explore-by-area-recipes">
            {recipes.slice(0, MAX_RECIPES).map((recipe, index) => (
              <RecipeCard index={ index } key={ index } recipe={ recipe } />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ExploreByArea;
