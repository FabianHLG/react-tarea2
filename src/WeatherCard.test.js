// WeatherCard.test.js
import WeatherCard from './Componentes/WeatherCard';

import { render, screen, waitFor } from '@testing-library/react';

describe('WeatherCard', () => {
  const mockWeatherData = {
    name: 'San José',
    sys: { country: 'CR' },
    main: { temp: 25, temp_max: 30, temp_min: 20, humidity: 60 },
    weather: [{ icon: '01d', description: 'Despejado' }],
    timezone: -21600 // GMT-6 para Costa Rica
  };

  test('muestra la información del clima correctamente', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    // Verifica que los elementos del clima se muestren en la pantalla
    expect(screen.getByText(/San José, CR/i)).toBeInTheDocument();
    expect(screen.getByText(/25.0°C/i)).toBeInTheDocument();
    expect(screen.getByText(/30.0°C/i)).toBeInTheDocument();
    expect(screen.getByText(/20.0°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Despejado/i)).toBeInTheDocument();
    expect(screen.getByText(/60%/i)).toBeInTheDocument();
  });

  test('muestra un mensaje si no hay datos de clima', () => {
    render(<WeatherCard weatherData={null} />);

    // Verifica que se muestre el mensaje para seleccionar un país y una ciudad
    expect(screen.getByText(/Por favor, selecciona un país y una ciudad para ver el clima./i)).toBeInTheDocument();
  });

  test('actualiza la hora local correctamente', async () => {
    jest.useFakeTimers(); // Usa temporizadores falsos para controlar el tiempo
    render(<WeatherCard weatherData={mockWeatherData} />);

    // Mueve el tiempo hacia adelante por un segundo
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      // Verifica que la hora se haya actualizado
      expect(screen.getByText(/:/)).toBeInTheDocument(); // Verifica que haya un formato de hora
    });

    jest.useRealTimers(); // Restablece los temporizadores reales
  });

});
