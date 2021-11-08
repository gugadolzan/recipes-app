const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function fetchCocktailsData(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchCocktailsData;

// Reference: <https://www.thecocktaildb.com/api.php>
