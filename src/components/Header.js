import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import '../styles/Header.css';

function Header({ title }) {
  const { pathname } = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchTopButton = () => (
    <button
      className="search-top-btn"
      onClick={ () => setShowSearchBar(!showSearchBar) }
      type="button"
    >
      <img alt="search icon" data-testid="search-top-btn" src={ searchIcon } />
    </button>
  );

  return (
    <>
      <header className="header">
        <Link className="profile-top-btn" to="/perfil">
          <img
            alt="profile icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </Link>
        <span className="page-title" data-testid="page-title">
          {title}
        </span>
        {(pathname === '/comidas'
          || pathname === '/bebidas'
          || pathname === '/explorar/comidas/area')
          && searchTopButton()}
      </header>
      {showSearchBar && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
