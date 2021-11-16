import React from 'react';
import { useLocation } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Comidas from './Comidas';

function ExploreRecipes() {
  const { pathname } = useLocation();

  const [headerTitle] = pathname.includes('/comidas')
    ? ['Explorar Comidas']
    : ['Explorar Bebidas'];

  return (
    <>
      <Header title={ headerTitle } />
      <Comidas />
      <Footer />
    </>
  );
}

export default ExploreRecipes;
