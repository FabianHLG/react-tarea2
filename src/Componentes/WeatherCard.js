import React from 'react';

// Función para obtener la hora local del lugar seleccionado
const getLocalTime = (timezone) => {
  const date = new Date();
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000); // Convertir a UTC
  const localTime = new Date(utcTime + (timezone * 1000)); // Sumar la diferencia del timezone
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.sys) {
    return <p>Por favor, selecciona un país y una ciudad para ver el clima.</p>;
  }

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity },
    wind: { speed },
    weather,
    timezone,
  } = weatherData;

  const currentWeather = weather[0];
  const weatherIconUrl = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}, {country}</h2>
      <p className="local-time">Hora local: {getLocalTime(timezone)}</p> {/* Hora local corregida */}
      <div className="weather-info">
        <div className="weather-main">
          <img src={weatherIconUrl} alt={currentWeather.description} className="weather-icon" />
          <p className="temperature">{temp.toFixed(2)}°C</p>
        </div>
        <div className="weather-details">
          <p><strong>Se siente como:</strong> {feels_like.toFixed(2)}°C</p>
          <p><strong>Humedad:</strong> {humidity}%</p>
          <p><strong>Velocidad del viento:</strong> {speed} m/s</p>
          <p><strong>Clima:</strong> {currentWeather.description}</p>
          <p><strong>Amanecer:</strong> {new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p><strong>Atardecer:</strong> {new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
