import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Explore.css';

function Explore() {
  return (
    <>
      <Header title="Explorar" />
      <div className="header-padding-top explore-links">
        <Link data-testid="explore-food" to="/explorar/comidas">
          Explorar Comidas
        </Link>
        <Link data-testid="explore-drinks" to="/explorar/bebidas">
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
