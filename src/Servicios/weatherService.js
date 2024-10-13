import axios from 'axios';

// Define la URL base y tu API Key
const API_KEY = 'ef72906a4e67f01bd6ae4ade73936409';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getWeatherByCity = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Para obtener las temperaturas en grados Celsius
          lang: 'es', // Agrega este parámetro para obtener la descripción en español
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
export const getForecastByCity = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'es', // Agrega este parámetro para obtener la descripción en español
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  };
  export const getAirQualityByCity = async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      throw error;
    }
  };