import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user ? user.email : null;

  return (
    <>
      <Header title="Perfil" />
      <div className="main-background">
        <div className="header-footer-padding profile-page">
          <h2 className="profile-email" data-testid="profile-email">{email}</h2>
          <Link
            className="profile-btn"
            data-testid="profile-done-btn"
            to="/receitas-feitas"
          >
            Receitas Feitas
          </Link>
          <Link
            className="profile-btn"
            data-testid="profile-favorite-btn"
            to="/receitas-favoritas"
          >
            Receitas Favoritas
          </Link>
          <Link
            className="profile-btn"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
            to="/"
          >
            Sair
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
