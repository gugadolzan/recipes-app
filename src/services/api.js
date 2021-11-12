const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const fetchData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const api = {
  meals: (endpoint) => fetchData(`${MEAL_API_URL}${endpoint}`),
  // Reference: https://www.themealdb.com/api.php
  drinks: (endpoint) => fetchData(`${COCKTAIL_API_URL}${endpoint}`),
  // Reference: https://www.thecocktaildb.com/api.php
};

const methods = {
  filterByArea: (area) => api.meals(`filter.php?a=${area}`),
  filterByCategory: (key, category) => api[key](`filter.php?c=${category}`),
  listAllAreas: () => api.meals('list.php?a=list'),
  listAllCategories: (key) => api[key]('list.php?c=list'),
  lookupDetails: (key, id) => api[key](`lookup.php?i=${id}`),
  searchBy: {
    ingredient: (key, ingredient) => api[key](`filter.php?i=${ingredient}`),
    name: (key, name) => api[key](`search.php?s=${name || ''}`),
    // fetch initial recipes and recomendations from www.themealdb.com/api/json/v1/1/search.php?s=
    firstLetter: (key, letter) => api[key](`search.php?f=${letter}`),
  },
};

export default methods;
