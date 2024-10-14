import { render, screen } from '@testing-library/react';
import AirQualityCard from './Componentes/AirQualityCard';

describe('AirQualityCard', () => {
  const mockAirQualityData = {
    list: [
      {
        main: { aqi: 2 }, // "Moderada"
        components: {
          pm2_5: 12.5,
          pm10: 20,
          co: 0.4,
          no2: 15,
          o3: 35,
          so2: 0.01,
        },
      },
    ],
  };

  test('muestra la información de calidad del aire correctamente', () => {
    render(<AirQualityCard airQualityData={mockAirQualityData} />);

    // Verifica que los elementos de calidad del aire se muestren en la pantalla
    expect(screen.getByText(/Índice de calidad del aire \(AQI\): Moderada/i)).toBeInTheDocument();
    expect(screen.getByText(/Partículas finas - \(PM2.5\): 12.5 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Partículas grandes - \(PM10\): 20 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Monóxido de carbono - \(CO\): 0.4 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Dióxido de nitrógeno - \(NO2\): 15 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Ozono - \(O3\): 35 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Dióxido de azufre - \(SO2\): 0.01 µg\/m³/i)).toBeInTheDocument();
  });

  test('no muestra nada si no hay datos de calidad del aire', () => {
    render(<AirQualityCard airQualityData={null} />);

    // Verifica que el componente no renderiza nada
    expect(screen.queryByText(/Índice de calidad del aire/i)).toBeNull();
  });
  
  test('muestra la información de calidad del aire con AQI no saludable', () => {
    const unhealthyAirQualityData = {
      list: [
        {
          main: { aqi: 5 }, // "Muy no saludable"
          components: {
            pm2_5: 50,
            pm10: 100,
            co: 0.5,
            no2: 20,
            o3: 60,
            so2: 0.02,
          },
        },
      ],
    };

    render(<AirQualityCard airQualityData={unhealthyAirQualityData} />);
    
    // Verifica que los elementos de calidad del aire se muestren correctamente para datos no saludables
    expect(screen.getByText(/Índice de calidad del aire \(AQI\): Muy no saludable/i)).toBeInTheDocument();
    expect(screen.getByText(/Partículas finas - \(PM2.5\): 50 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Partículas grandes - \(PM10\): 100 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Monóxido de carbono - \(CO\): 0.5 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Dióxido de nitrógeno - \(NO2\): 20 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Ozono - \(O3\): 60 µg\/m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Dióxido de azufre - \(SO2\): 0.02 µg\/m³/i)).toBeInTheDocument();
  });
});
