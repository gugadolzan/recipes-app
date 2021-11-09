import React, { useState } from 'react';
import { useLocation } from 'react-router';

import api from '../services/api';
import SearchRadio from './SearchRadio';

function SearchBar() {
  const { pathname } = useLocation();

  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const fetchData = (path, endpoint) => (path === '/comidas'
    ? api.mealDB(endpoint)
    : api.cocktailDB(endpoint));

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (searchRadio) {
    case 'ingredient':
      fetchData(pathname, `/filter.php?i=${searchInput}`).then((response) => {
        console.log(response);
      });
      break;
    case 'name':
      fetchData(pathname, `/search.php?s=${searchInput}`).then((response) => {
        console.log(response);
      });
      break;
    case 'first-letter':
      if (searchInput.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }

      fetchData(pathname, `/search.php?f=${searchInput}`).then((response) => {
        console.log(response);
      });
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <h2>SearchBar</h2>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
          placeholder="Buscar receita"
          type="text"
          value={ searchInput }
        />
        <SearchRadio
          checked={ searchRadio === 'ingredient' }
          id="ingredient"
          label="Ingrediente"
          name="search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
        <SearchRadio
          checked={ searchRadio === 'name' }
          id="name"
          label="Nome"
          name="search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
        <SearchRadio
          checked={ searchRadio === 'first-letter' }
          id="first-letter"
          label="Primeira letra"
          name="search-radio"
          onChange={ ({ target }) => setSearchRadio(target.value) }
        />
        <button
          data-testid="exec-search-btn"
          disabled={ !searchInput || !searchRadio }
          type="submit"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
