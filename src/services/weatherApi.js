import axios from 'axios';

// WeatherAPI endpoints
// docs: https://www.weatherapi.com/docs/

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const weatherService = {
  // Get current weather & forecast (we can get both in one call with forecast.json)
  getForecast: async (query, days = 7) => {
    try {
      if (!API_KEY) throw new Error("API Key is missing. Please add VITE_WEATHER_API_KEY to your secrets.");
      const response = await apiClient.get('/forecast.json', {
        params: {
          q: query,
          days,
          aqi: 'yes',
          alerts: 'yes'
        }
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Search locations for autocomplete
  searchLocations: async (query) => {
    if (!query || query.length < 3) return [];
    try {
      if (!API_KEY) return [];
      const response = await apiClient.get('/search.json', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  }
};

function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return new Error(error.response.data.error?.message || 'Failed to fetch weather data');
  } else if (error.request) {
    // The request was made but no response was received
    return new Error('No response from weather service. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    return error;
  }
}
