import React, { useState } from 'react';
import Slider from 'react-slick';

import { getWeatherIcon } from './weatherUtils';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false, // Desactivamos adaptiveHeight para que el carrusel tenga una altura fija
  };

  const groupedForecasts = {};
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedForecasts[date]) {
      groupedForecasts[date] = [];
    }
    groupedForecasts[date].push(item);
  });

  const forecastDays = Object.keys(groupedForecasts);

  return (
    <div className="forecast-card">
      <h2>Pronóstico de 5 días</h2>
      <Slider {...settings}>
        {forecastDays.slice(0, 5).map((date, index) => {
          const dailyForecast = groupedForecasts[date];
          const tempMax = Math.max(...dailyForecast.map(item => item.main.temp_max));
          const tempMin = Math.min(...dailyForecast.map(item => item.main.temp_min));
          const description = dailyForecast[0].weather[0].description;
          const windSpeed = dailyForecast[0].wind.speed;
          const icon = getWeatherIcon(dailyForecast[0].weather[0].icon);
          
          return (
            <div key={index} className="forecast-item">
              <h3>{new Date(date).toLocaleDateString('es-LA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
              <img src={icon} alt={description} className="weather-icon" />
              <ForecastDetails tempMax={tempMax} tempMin={tempMin} description={description} windSpeed={windSpeed} />
              <HourlyForecast hourlyData={dailyForecast} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

const ForecastDetails = ({ tempMax, tempMin, description, windSpeed }) => {
  return (
    <div className="forecast-info">
      <p>Máxima: {tempMax.toFixed(1)}°C</p>
      <p>Mínima: {tempMin.toFixed(1)}°C</p>
      <p>Clima: {description}</p>
      <p>Viento: {windSpeed} m/s</p>
    </div>
  );
};

// Componente para mostrar detalles por hora
const HourlyForecast = ({ hourlyData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleHourDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hourly-forecast">
      <h4>Detalles por hora</h4>
      {hourlyData.map((item, index) => (
        <div key={index}>
          <button className="hourly-button" onClick={() => toggleHourDetails(index)}>
            {new Date(item.dt_txt).toLocaleTimeString('es-LA', { hour: '2-digit', minute: '2-digit' })} 
            {openIndex === index ? ' - Menos' : ' - Más'}
          </button>
          {openIndex === index && (
            <div className="hourly-details">
              <p>Temperatura: {item.main.temp.toFixed(1)}°C</p>
              <p>Clima: {item.weather[0].description}</p>
              <p>Viento: {item.wind.speed} m/s</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
