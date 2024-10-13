import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importamos el ícono de lupa

const SearchBar = ({ onSearch, countries }) => {
  const [city, setCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city, selectedCountry);
    }
    setCity('');
    setSelectedCountry('');
    setIsOpen(false);
  };

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-container">
      <button className="search-button" onClick={toggleSearchBar}>
        <FaSearch size={24} color="#fff" />
      </button>
      {isOpen && (
        <div className="search-modal">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Ingrese el nombre de la ciudad..." 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />
            <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.cca2}>{country.name.common}</option>
              ))}
            </select>
            <button className="search-submit" onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
