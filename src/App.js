import React from 'react';
import Provider from './context/RecipesProvider';
import Routes from './routes';

const App = () => (
  <Provider>
    <Routes />
  </Provider>
);

export default App;
