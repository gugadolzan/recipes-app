import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Profile</h1>
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
    </div>
  );
}

export default Profile;
