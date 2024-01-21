// App.js
import React, { useState } from 'react';
import JsonCard from './Components/JsonCard';
import { generateRandomJSON } from './RandomJson/Random';
import './App.css'; 

const App = () => {
  const initialData = JSON.parse(generateRandomJSON());
  const [randomData, setRandomData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenerateRandomData = () => {
    setRandomData(JSON.parse(generateRandomJSON()));
    setSearchTerm(''); 
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = randomData.filter((jsonData) => {
    const jsonString = JSON.stringify(jsonData).toLowerCase();
    return jsonString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="app-container">
      <button onClick={handleGenerateRandomData} className="generate-button">
        Generate Random JSON Data
      </button>
      <input
        type="text"
        placeholder="Search JSON..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {filteredData.map((jsonData, index) => (
        <JsonCard key={index} data={jsonData} />
      ))}
    </div>
  );
};

export default App;
