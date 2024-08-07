import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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