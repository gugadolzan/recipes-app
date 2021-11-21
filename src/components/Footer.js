import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

const FOOTER_BUTTONS = [
  {
    alt: 'meal icon',
    dataTestId: 'food-bottom-btn',
    to: '/comidas',
    src: mealIcon,
  },
  {
    alt: 'explore icon',
    dataTestId: 'explore-bottom-btn',
    to: '/explorar',
    src: exploreIcon,
  },
  {
    alt: 'drink icon',
    dataTestId: 'drinks-bottom-btn',
    to: '/bebidas',
    src: drinkIcon,
  },
];

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      {FOOTER_BUTTONS.map(({ alt, dataTestId, src, to }) => (
        <Link key={ alt } to={ to }>
          <img alt={ alt } data-testid={ dataTestId } src={ src } />
        </Link>
      ))}
    </footer>
  );
}

export default Footer;
