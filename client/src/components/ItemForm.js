import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemForm() {
  const [item, setItem] = useState({ item_name: '', description: '', quantity: 0 });
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/items/${id}`)
        .then(response => response.json())
        .then(data => setItem(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create or edit items');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/api/items/${id}` : 'http://localhost:3001/api/items';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, user_id: user.id })
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
      })
      .then(savedItem => {
        console.log('Item saved successfully:', savedItem); // testing for correct error handling and navigation
        alert(id ? 'Item updated successfully' : 'Item created successfully');
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message || 'Failed to save item');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="item_name"
        value={item.item_name}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <textarea
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <button type="submit">{id ? 'Update' : 'Create'} Item</button>
    </form>
  );
}

export default ItemForm;