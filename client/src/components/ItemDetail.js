import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail({ setShouldFetch }) {
  const [item, setItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data));
  }, [id]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        return response.json();
      })
      .then(updatedItem => {
        setItem(updatedItem);
        setEditMode(false);
        setShouldFetch(true);
        alert('Item updated successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.message);
      });
  };

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
          setShouldFetch(true);
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
      <h1>
        {editMode ? (
          <input
            name="item_name"
            value={item.item_name}
            onChange={handleChange}
            style={{ fontSize: '2em', fontWeight: 'bold' }}
          />
        ) : (
          item.item_name
        )}
      </h1>
      <p>
        Description: {' '}
        {editMode ? (
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            style={{ width: '100%', minHeight: '100px' }}
          />
        ) : (
          item.description
        )}
      </p>
      <p>
        Quantity: {' '}
        {editMode ? (
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
          />
        ) : (
          item.quantity
        )}
      </p>
      {item.added_by && <p>Added by: {item.added_by}</p>}
      {user && user.id === item.user_id && (
        <>
          {editMode ? (
            <>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
}

export default ItemDetail;