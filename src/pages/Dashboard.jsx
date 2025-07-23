// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');

    if (!token) {
      navigate('/login');
    }

    setEmail(userEmail || '');
    setRole(userRole || '');
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Welcome, {email}</h2>
      <p>Your role: <strong>{role}</strong></p>

      <div style={styles.links}>
        <button onClick={() => navigate('/courses')}>View Courses</button>
        {role === 'INSTRUCTOR' && (
          <button onClick={() => navigate('/add-course')}>Add Course</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  links: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
};

export default Dashboard;
    
