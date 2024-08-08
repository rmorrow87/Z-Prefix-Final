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

    // GET items based on logged in user vs visitor
    const fetchItems = async () => {
      try {
        // GET individual user's items
        if (user) {
          const userResponse = await fetch(`http://localhost:3001/api/items?user_id=${user.id}`);
          if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
          }
          const userData = await userResponse.json();
          setItems(userData);
        }

        // GET all items in DB
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

  // User item logic to handle local storage of logged in user
  // Occurs on setShouldFetch change from user interaction
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

  // Determine and display appropriate items for logged in user vs visitor
  const displayedItems = viewAll ? allItems : (user ? items : allItems);

  return (
    <div className="item-list-container">
      <h1 className="inventory-title">Current Items</h1>
      {user && (
        <div className="toggle-button">
          <button onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View My Items" : "View All Items"}
          </button>
        </div>
      )}
      {displayedItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="item-list">
          {displayedItems.map(item => (
            <li key={item.id} className="item-card">
              <Link to={`/item/${item.id}`} className="item-link">
                <strong>Quantity: {item.quantity}</strong>
                <h3>{item.item_name}</h3>
                <p>
                  {item.description && item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </p>
                {item.added_by && <p className="added-by">Added by: {item.added_by}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;