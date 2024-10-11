import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.sys) {
    return null; // Si no hay datos, no renderiza nada
  }

  const { name, main, weather, wind, sys } = weatherData;

  return (
    <div className="weather-card">
      <h2>{name}, {sys.country}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Feels like: {main.feels_like}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Weather: {weather[0].description}</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherCard;