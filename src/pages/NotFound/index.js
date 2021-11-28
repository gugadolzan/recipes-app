import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="header-footer-padding main-background">
      <div className="not-found">
        <p>Page not found!</p>
        <div>
          <Link to="/comidas">Return</Link>
          <span> to main page.</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
