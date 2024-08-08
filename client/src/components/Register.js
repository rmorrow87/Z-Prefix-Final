import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Registration saving user as state to be put in DB
function Register() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  // Set state values to user input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Add state info to user table in DB
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        return response.json();
      })
      .then(data => {
        alert('Registration successful! Please log in.');
        navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="first_name"
        value={user.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="last_name"
        value={user.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;