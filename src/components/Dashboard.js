// src/components/Dashboard.js
import React, { useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  const handleCall = async () => {
    try {
      const response = await axios.get('/api/test/hello'); // protected endpoint
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      alert('Unauthorized or Token missing ❌');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleCall}>Call Protected API</button>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
