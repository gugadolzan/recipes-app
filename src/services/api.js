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
  mealDB: (endpoint) => fetchData(`${MEAL_API_URL}${endpoint}`),
  // Reference: <https://www.themealdb.com/api.php>

  cocktailDB: (endpoint) => fetchData(`${COCKTAIL_API_URL}${endpoint}`),
  // Reference: <https://www.thecocktaildb.com/api.php>
};

export default api;
