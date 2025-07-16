import React, { useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); // default role
  const [token, setToken] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
        role
      });

      const jwtToken = response.data; // Assuming the token is returned in this format
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
      alert('Signup Successful ✅');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Signup Failed ❌');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="MENTOR">Mentor</option>
          <option value="ADMIN">Admin</option>
        </select><br />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>


      {token && (
        <div>
          <h4>JWT Token:</h4>
          <p style={{ wordBreak: 'break-word' }}>{token}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
