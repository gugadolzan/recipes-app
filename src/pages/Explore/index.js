import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './Explore.css';

function Explore() {
  return (
    <>
      <Header title="Explorar" />
      <div className="explore-background">
        <div className="header-footer-padding explore-links">
          <Link data-testid="explore-food" to="/explorar/comidas">
            Explorar Comidas
          </Link>
          <Link data-testid="explore-drinks" to="/explorar/bebidas">
            Explorar Bebidas
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
