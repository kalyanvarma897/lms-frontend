import React, { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // ✅ Add this line

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("auth/login", {
        email,
        password
      });

      const jwtToken = response.data; // Assuming backend returns just the token string
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
      alert("Login successful!");

      navigate("/dashboard"); // ✅ Navigate to dashboard
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

      {token && (
        <div>
          <h4>JWT Token:</h4>
          <p style={{ wordBreak: 'break-all' }}>{token}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
