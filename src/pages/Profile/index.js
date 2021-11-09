import React from 'react';
import { Link } from 'react-router-dom';
import storage from '../../services/storage';

function Profile() {
  const userEmail = storage.read('user');

  return (
    <div>
      <h1>Profile</h1>
      <h2 data-testid="profile-email">{ userEmail }</h2>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">Receitas Feitas</Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">Receitas Favoritas</Link>
        <Link to="/" onClick={ storage.clear('user') }data-testid="profile-logout-btn">Sair</Link>
    </div>
  );
}

export default Profile;
