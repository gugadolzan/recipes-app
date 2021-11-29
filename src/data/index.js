// initial localStorage

export default [
  {
    key: 'mealsToken',
    value: 1,
  },
  {
    key: 'cocktailsToken',
    value: 1,
  },
  {
    key: 'user',
    value: {
      email: '',
    },
  },
  {
    key: 'doneRecipes',
    value: [],
  },
  {
    key: 'favoriteRecipes',
    value: [],
  },
  {
    key: 'inProgressRecipes',
    value: {
      cocktails: {},
      meals: {},
    },
  },
];
