import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherApi';

export function useWeather(initialLocation = 'London') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  
  // Try to load last user location from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem('last_weather_location');
    if (saved) {
      setLocationQuery(saved);
    }
  }, []);

  const fetchWeather = useCallback(async (query) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherService.getForecast(query);
      setData(weatherData);
      localStorage.setItem('last_weather_location', query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(locationQuery);
  }, [locationQuery, fetchWeather]);

  const refresh = () => fetchWeather(locationQuery);

  const setLocationByCoords = (lat, lon) => {
    setLocationQuery(`${lat},${lon}`);
  };

  return {
    data,
    loading,
    error,
    locationQuery,
    setLocationQuery,
    setLocationByCoords,
    refresh
  };
}
