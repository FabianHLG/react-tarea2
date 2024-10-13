import React, { useState, useEffect } from 'react';
import SearchBar from './Componentes/SearchBar';
import WeatherCard from './Componentes/WeatherCard';
import ForecastCard from './Componentes/ForecastCard';
import AirQualityCard from './Componentes/AirQualityCard';
import { getWeatherByCity, getForecastByCity, getAirQualityByCity } from './Servicios/weatherService';
import './App.css';
import './SearchBar.css';
import './WeatherCard.css';
import './ForecastCard.css';
import './AirQualityCard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const sortedCountries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sortedCountries);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchWeatherByLocation = async (lat, lon) => {
      try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ef72906a4e67f01bd6ae4ade73936409&units=metric&lang=es`);
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        const airQuality = await getAirQualityByCity(lat, lon);
        setAirQualityData(airQuality);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ef72906a4e67f01bd6ae4ade73936409&units=metric&lang=es`);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      } catch (error) {
        setError('Error al obtener el clima por ubicación');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setError('No se pudo obtener la ubicación. Por favor, ingresa una ciudad.');
        }
      );
    } else {
      setError('Geolocalización no es compatible con este navegador.');
    }
  }, []);

  const handleSearch = async (city, selectedCountry) => {
    try {
      const weather = await getWeatherByCity(`${city},${selectedCountry}`);
      const forecast = await getForecastByCity(`${city},${selectedCountry}`);
      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);

      const { coord } = weather;
      const airQuality = await getAirQualityByCity(coord.lat, coord.lon);
      setAirQualityData(airQuality);
    } catch (err) {
      setError('Ciudad no encontrada');
    }
  };

  return (
    <div className="app">
      <h1>Aplicación del Clima</h1>
      <SearchBar onSearch={handleSearch} countries={countries} />
      {error && <p>{error}</p>}
      <WeatherCard weatherData={weatherData} />
      <ForecastCard forecastData={forecastData} />
      <AirQualityCard airQualityData={airQualityData} />
    </div>
  );
};

export default App;




