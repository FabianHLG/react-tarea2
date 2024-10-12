import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Ingrese el nombre de la ciudad..." 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;