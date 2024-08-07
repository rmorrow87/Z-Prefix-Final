import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ItemList({ shouldFetch, setShouldFetch }) {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const location = useLocation();

  useEffect(() => {
    setShouldFetch(true);
  }, [location]);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchItems = async () => {
      try {
        // Fetch user's items
        if (user) {
          const userResponse = await fetch(`http://localhost:3001/api/items?user_id=${user.id}`);
          if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
          }
          const userData = await userResponse.json();
          setItems(userData);
        }

        // Fetch all items
        const allResponse = await fetch('http://localhost:3001/api/items');
        if (!allResponse.ok) {
          throw new Error(`HTTP error! status: ${allResponse.status}`);
        }
        const allData = await allResponse.json();
        setAllItems(allData);

        setShouldFetch(false);
      } catch (e) {
        console.error("There was a problem fetching items:", e);
        setError(e.message);
      }
    };

    fetchItems();
  }, [user, shouldFetch]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (JSON.stringify(storedUser) !== JSON.stringify(user)) {
        setUser(storedUser);
        setShouldFetch(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, setShouldFetch]);

  if (error) return <div>Error: {error}</div>;

  const displayedItems = viewAll ? allItems : (user ? items : allItems);

  return (
    <div>
      <h1>Inventory Items</h1>
      {user && (
        <button onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "View My Items" : "View All Items"}
        </button>
      )}
      {displayedItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {displayedItems.map(item => (
            <li key={item.id}>
              <strong>Quantity: {item.quantity}</strong> - {' '}
              <Link to={`/item/${item.id}`}>{item.item_name}</Link>
              {" - "}
              {item.description && item.description.length > 100
                ? item.description.substring(0, 100) + "..."
                : item.description}
              {item.added_by && (
                <span> (Added by: {item.added_by})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;