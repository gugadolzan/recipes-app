import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../tests/renderWhihRouter';
import Index from './index';

describe(
  '[TELA EXPLORAR] Verifica os elementos na tela os atributos descrito no protótipo',
  () => {
    it(
      'Verifica se há dois botoẽs com o atributos data-testid="explore-food" e '
        + 'data-testid="explore-drinks"',
      () => {
        renderWithRouter(<Index />);

        const exploreFoodButton = screen.getByTestId('explore-food');
        const exploreDrinksButton = screen.getByTestId('explore-drinks');
        expect(exploreFoodButton).toBeInTheDocument();
        expect(exploreDrinksButton).toBeInTheDocument();
      },
    );
  },
);
