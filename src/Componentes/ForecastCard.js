import Slider from 'react-slick';
import { getWeatherIcon } from './weatherUtils';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: false, // Desactivar el deslizamiento infinito
    speed: 500,
    slidesToShow: 4, // Muestra 4 horas a la vez
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Obtener el índice de la primera hora más cercana a la hora actual
  const firstRelevantIndex = forecastData.list.findIndex(item => {
    const forecastHour = new Date(item.dt_txt).getHours();
    return forecastHour === currentHour || forecastHour === currentHour + 1; // También considera la próxima hora
  });

  // Si no hay horas futuras, comenzamos desde la primera hora del día siguiente
  const startingIndex = firstRelevantIndex !== -1 ? firstRelevantIndex : 0;

  return (
    <div className="forecast-card">
      <Slider {...settings} initialSlide={startingIndex}>
        {forecastData.list.map((item, index) => {
          const icon = getWeatherIcon(item.weather[0].icon);
          const description = item.weather[0].description;
          const maxTemp = item.main.temp_max.toFixed(1);
          const minTemp = item.main.temp_min.toFixed(1);
          const forecastDate = new Date(item.dt_txt).toLocaleDateString('es-LA', { weekday: 'long', day: 'numeric' });

          return (
            <div key={index} className="hourly-item">
              <h3 className="forecast-date">{forecastDate}</h3> {/* Día */}
              <h4 className="hourly-time">
                {new Date(item.dt_txt).toLocaleTimeString('es-LA', { hour: '2-digit', minute: '2-digit', hour12: true })} {/* Formato 12 horas */}
              </h4>
              <div className="hourly-icon-container">
                <img src={icon} alt={description} className="weather-icon" />
              </div>
              <p className="weather-description">{description.charAt(0).toUpperCase() + description.slice(1)}</p> {/* Descripción del clima */}
              <p className="hourly-detail" style={{ marginBottom: '10px' }}>Máx: {maxTemp}°C</p> {/* Temperatura máxima con separación */}
              <p className="hourly-detail" style={{ marginTop: '10px' }}>Mín: {minTemp}°C</p> {/* Temperatura mínima con separación */}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ForecastCard;
