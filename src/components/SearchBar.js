import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import RecipesContext from '../context/RecipesContext';
import methods from '../services/api';
import SearchRadio from './SearchRadio';

import '../styles/SearchBar.css';

const { searchBy } = methods;
const SEARCH_RADIO_OPTIONS = [
  {
    id: 'ingredient',
    label: 'Ingrediente',
  },
  {
    id: 'name',
    label: 'Nome',
  },
  {
    id: 'first-letter',
    label: 'Primeira letra',
  },
];

function SearchBar() {
  const { setCocktailsRecipes, setMealsRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const { pathname } = history.location;
  const [recipeType, setRecipes] = pathname === '/comidas'
    ? ['meals', setMealsRecipes]
    : ['drinks', setCocktailsRecipes];

  const redirectToDetails = (id) => {
    history.push(`${pathname}/${id}`);
  };

  const fetchData = async (type) => {
    const response = await searchBy[type](recipeType, searchInput);

    if (!response[recipeType]) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }

    if (response[recipeType].length === 1) {
      return redirectToDetails(
        response[recipeType][0].idDrink || response[recipeType][0].idMeal,
      );
    }

    return setRecipes(response[recipeType]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (searchRadio) {
    case 'ingredient':
      fetchData('ingredient');
      break;
    case 'name':
      fetchData('name');
      break;
    case 'first-letter':
      if (searchInput.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
        // alert when search input is more than 1 character
      }
      fetchData('firstLetter');
      break;
    default:
      break;
    }
  };

  return (
    <form className="search-bar" onSubmit={ handleSubmit }>
      <input
        className="search-bar-input"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
        placeholder="Buscar receita"
        type="text"
        value={ searchInput }
      />
      <div className="search-radio-container">
        {SEARCH_RADIO_OPTIONS.map(({ label, id }) => (
          <SearchRadio
            key={ id }
            checked={ searchRadio === id }
            id={ id }
            label={ label }
            name="search-radio"
            onChange={ ({ target }) => setSearchRadio(target.value) }
          />
        ))}
      </div>
      <button
        className="search-bar-button"
        data-testid="exec-search-btn"
        disabled={ !searchInput || !searchRadio }
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
