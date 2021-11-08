const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

async function fetchMealsData(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default fetchMealsData;

// Reference: <https://www.themealdb.com/api.php>
