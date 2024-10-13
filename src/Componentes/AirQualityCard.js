import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmog, faCloud, faWind, faBiohazard, faGasPump, faRadiation } from '@fortawesome/free-solid-svg-icons';

const AirQualityCard = ({ airQualityData }) => {
  if (!airQualityData) {
    return null;
  }

  const aqiLevels = ["Buena", "Moderada", "No saludable para grupos sensibles", "No saludable", "Muy no saludable", "Peligrosa"];
  const aqi = airQualityData.list[0].main.aqi; // AQI de la primera entrada

  return (
    <div className="forecast-card">
      <div className="hourly-item">
        <p className="forecast-date">
          <FontAwesomeIcon icon={faSmog} /> Índice de calidad del aire (AQI): {aqiLevels[aqi - 1]}
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faCloud} /> Partículas finas - (PM2.5): {airQualityData.list[0].components.pm2_5} µg/m³
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faCloud} /> Partículas grandes - (PM10): {airQualityData.list[0].components.pm10} µg/m³
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faGasPump} /> Monóxido de carbono - (CO): {airQualityData.list[0].components.co} µg/m³
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faWind} /> Dióxido de nitrógeno - (NO2): {airQualityData.list[0].components.no2} µg/m³
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faRadiation} /> Ozono - (O3): {airQualityData.list[0].components.o3} µg/m³
        </p>
      </div>
      <div className="hourly-item">
        <p className="hourly-detail">
          <FontAwesomeIcon icon={faBiohazard} /> Dióxido de azufre - (SO2): {airQualityData.list[0].components.so2} µg/m³
        </p>
      </div>
    </div>
  );
};

export default AirQualityCard;


