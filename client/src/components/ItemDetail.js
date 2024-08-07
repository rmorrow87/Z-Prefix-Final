import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [id]);

  const handleDelete = () => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then(() => navigate('/'));
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.item_name}</h1>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ItemDetail;