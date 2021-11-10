import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import RecipesContext from '../context/RecipesContext';
import api from '../services/api';
import SearchRadio from './SearchRadio';

import '../styles/SearchBar.css';

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

  const { pathname } = useLocation();

  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const redirectToDetails = (id) => {
    history.push(`${pathname}/${id}`);
  };

  const fetchData = async (endpoint) => {
    const response = pathname === '/comidas'
      ? await api.mealDB(endpoint)
      : await api.cocktailDB(endpoint);

    const key = Object.keys(response);

    if (!response[key]) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }

    if (response[key].length === 1) {
      return redirectToDetails(
        response[key][0].idDrink || response[key][0].idMeal,
      );
    }

    return pathname === '/comidas'
      ? setMealsRecipes(response[key])
      : setCocktailsRecipes(response[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (searchRadio) {
    case 'ingredient':
      fetchData(`filter.php?i=${searchInput}`);
      break;
    case 'name':
      fetchData(`search.php?s=${searchInput}`);
      break;
    case 'first-letter':
      if (searchInput.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
        // alert when search input is more than 1 character
      }
      fetchData(`search.php?f=${searchInput}`);
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
