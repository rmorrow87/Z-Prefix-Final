import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Login comparing user and credential states
function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Set credential state values to user input
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Convert states to strings and check for match; set appropriate user state in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;