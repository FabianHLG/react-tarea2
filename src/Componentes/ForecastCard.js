import React from 'react';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData) {
    return null;
  }

  const forecastItems = forecastData.list.map((item, index) => (
    <div key={index} className="forecast-item">
      <p>{new Date(item.dt_txt).toLocaleString()}</p>
      <p>Temp: {item.main.temp}°C</p>
      <p>Weather: {item.weather[0].description}</p>
      <p>Wind: {item.wind.speed} m/s</p>
    </div>
  ));

  return (
    <div className="forecast-card">
      <h2>5-Day Forecast</h2>
      <div className="forecast-items">{forecastItems}</div>
    </div>
  );
};

export default ForecastCard;