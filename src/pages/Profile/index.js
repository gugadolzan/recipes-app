import React from 'react';
import { Link } from 'react-router-dom';
import storage from '../../services/storage';

function Profile() {
  const userEmail = storage.read('user')

  return (
    <div>
      <h1>Profile</h1>
      <h2>{ userEmail }</h2>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      </Link>
      <Link to="/">
        <button type="button" onClick={ storage.clear('user') }>Sair</button>
      </Link>
    </div>
  );
}

export default Profile;
