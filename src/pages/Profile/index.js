import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header />
      <h2 data-testid="profile-email">{email}</h2>
      <Link data-testid="profile-done-btn" to="/receitas-feitas">
        Receitas Feitas
      </Link>
      <Link data-testid="profile-favorite-btn" to="/receitas-favoritas">
        Receitas Favoritas
      </Link>
      <Link
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
        to="/"
      >
        Sair
      </Link>
      <Footer />
    </>
  );
}

export default Profile;
