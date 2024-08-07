import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const url = user
      ? `http://localhost:3001/api/items?user_id=${user.id}`
      : 'http://localhost:3001/api/items';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(e => {
        console.error("There was a problem fetching the items:", e);
        setError(e.message);
      });
  }, [user]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user ? 'My Inventory Items' : 'All Inventory Items'}</h1>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <Link to={`/item/${item.id}`}>{item.item_name}</Link>
              {" - "}
              {item.description && item.description.length > 100
                ? item.description.substring(0, 100) + "..."
                : item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;