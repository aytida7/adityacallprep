// Card.js
import React from 'react';
import JsonCard from '../Components/JsonCard';

const Card = ({ jsonData }) => {
  return (
    <div style={{ border: '3px solid #000000', padding: '10px', marginBottom: '10px' }}>
      <JsonCard data={jsonData} />
    </div>
  );
};

export default Card;
