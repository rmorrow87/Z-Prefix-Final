import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemForm() {
  const [item, setItem] = useState({ item_name: '', description: '', quantity: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then(response => response.json())
        .then(data => setItem(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to create or edit items');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/items/${id}` : '/api/items';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, user_id: user.id })
    })
      .then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="item_name"
        value={item.item_name}
        onChange={handleChange}
        placeholder="Item Name"
      />
      <textarea
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <button type="submit">{id ? 'Update' : 'Create'} Item</button>
    </form>
  );
}

export default ItemForm;