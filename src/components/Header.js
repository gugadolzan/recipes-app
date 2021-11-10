import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const PAGE_TITLES = {
  '/comidas': 'Comidas',
  '/bebidas': 'Bebidas',
  '/explorar': 'Explorar',
  '/explorar/comidas': 'Explorar Comidas',
  '/explorar/bebidas': 'Explorar Bebidas',
  '/explorar/comidas/ingredientes': 'Explorar Ingredientes',
  '/explorar/bebidas/ingredientes': 'Explorar Ingredientes',
  '/explorar/comidas/area': 'Explorar Origem',
  '/receitas-feitas': 'Receitas Feitas',
  '/receitas-favoritas': 'Receitas Favoritas',
  '/perfil': 'Perfil',
};

function Header() {
  const { pathname } = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(false);

  // const getPageTitle = () => {
  //   const path = pathname.split('/');
  //   path.shift();
  //   // remove empty string from array

  //   if (path.includes('ingredientes')) {
  //     return 'Explorar Ingredientes';
  //   }

  //   const title = path.map(
  //     (word) => word.charAt(0).toUpperCase() + word.slice(1),
  //   );
  //   // capitalize first letter of each word

  //   return title.join(' ');
  // };

  const searchTopButton = () => (
    <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
      <img alt="search icon" data-testid="search-top-btn" src={ searchIcon } />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img
          alt="profile icon"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </Link>

      <span data-testid="page-title">{PAGE_TITLES[pathname]}</span>

      {(pathname === '/comidas'
        || pathname === '/bebidas'
        || pathname === '/explorar/comidas/area')
        && searchTopButton()}

      {showSearchBar && <SearchBar />}
    </header>
  );
}

export default Header;
