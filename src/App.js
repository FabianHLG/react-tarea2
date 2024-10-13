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
import './AirQualityCard.css'; // Importamos los estilos de AirQualityCard
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null); // Nuevo estado para calidad del aire
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric&lang=es`);
        const data = await response.json();
        setWeatherData(data);

        // Llamada para obtener la calidad del aire por ubicación
        const airQuality = await getAirQualityByCity(lat, lon);
        setAirQualityData(airQuality);
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
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    try {
      const weather = await getWeatherByCity(`${city},${selectedCountry}`);
      const forecast = await getForecastByCity(`${city},${selectedCountry}`);
      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);

      // Llamada para obtener la calidad del aire
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
      <div>
        <select onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
          ))}
        </select>
        <SearchBar onSearch={handleSearch} />
      </div>
      {error && <p>{error}</p>}
      <WeatherCard weatherData={weatherData} />
      <ForecastCard forecastData={forecastData} />
      <AirQualityCard airQualityData={airQualityData} />
    </div>
  );
};

export default App;

