import React, { useState, useEffect } from 'react';
import SearchBar from './Componentes/SearchBar';
import WeatherCard from './Componentes/WeatherCard';
import ForecastCard from './Componentes/ForecastCard';
import { getWeatherByCity, getForecastByCity } from './Servicios/weatherService';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherByLocation = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=TU_API_KEY&units=metric`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError('Error fetching weather by location');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    try {
      const weather = await getWeatherByCity(city);
      const forecast = await getForecastByCity(city);
      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError('City not found');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <WeatherCard weatherData={weatherData} />
      <ForecastCard forecastData={forecastData} />
    </div>
  );
};

export default App;
