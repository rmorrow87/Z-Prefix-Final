import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      fetch(`http://localhost:3001/api/items/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete item');
          }
          return response.json();
        })
        .then(() => {
          alert('Item deleted successfully');
          navigate('/');
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message);
        });
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.item_name}</h1>
      <p>Description: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
      {item.added_by && <p>Added by: {item.added_by}</p>}
      {user && user.id === item.user_id && (
        <>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}

export default ItemDetail;