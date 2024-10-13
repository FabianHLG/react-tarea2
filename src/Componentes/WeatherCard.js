import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Función para obtener la hora local del lugar seleccionado y actualizarla automáticamente
const getLocalTime = (timezone) => {
  const date = new Date();
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000); // Convertir a UTC
  const localTime = new Date(utcTime + (timezone * 1000)); // Sumar la diferencia del timezone
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true});
};

const WeatherCard = ({ weatherData }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (weatherData && weatherData.timezone) {
      const interval = setInterval(() => {
        setCurrentTime(getLocalTime(weatherData.timezone));
      }, 1000); // Actualizar la hora cada segundo
      return () => clearInterval(interval);
    }
  }, [weatherData]);

  if (!weatherData || !weatherData.sys) {
    return <p>Por favor, selecciona un país y una ciudad para ver el clima.</p>;
  }

  const {
    name,
    sys: { country },
    main: { temp, temp_max, temp_min, humidity },
    weather,
  } = weatherData;

  const currentWeather = weather[0];
  const weatherIconUrl = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>
        {name}, {country} <FontAwesomeIcon icon={faMapMarkerAlt} /> {/* Nuevo ícono de ubicación */}
      </h2>
      <div className="weather-info">
        <div className="weather-main">
          <img src={weatherIconUrl} alt={currentWeather.description} className="weather-icon" />
          <p className="temperature">{temp.toFixed(1)}°C</p>
        </div>
        <div className="weather-details">
          <p className="temperature-range">{temp_min.toFixed(1)}°C / {temp_max.toFixed(1)}°C</p>
          <p className="weather-description">{currentWeather.description}</p>
          <p>{humidity}%</p>
          <p className="local-time">{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
