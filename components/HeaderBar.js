import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../src/images/profileIcon.svg';
import searchIcon from '../src/images/searchIcon.svg';

function HeaderBar() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const pageTitle = pathname.split('/')[1];
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        name="profile-top-btn"
        id="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Ir para o perfil" />
      </button>
      <span data-testid="page-title">{pageTitle}</span>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => console.log('abrir barra de busca') }
      >
        <img src={ searchIcon } alt="Fazer busca" />
      </button>
    </div>
  );
}

export default HeaderBar;
