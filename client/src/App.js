import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemForm from './components/ItemForm';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="nav-buttons">
      <Link to="/" className="nav-button">Home</Link>
      {user ? (
        <>
          <Link to="/add" className="nav-button">Add Item</Link>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </>
      ) : (
        <>
          <Link to="/register" className="nav-button">Register</Link>
          <Link to="/login" className="nav-button">Login</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [shouldFetchItems, setShouldFetchItems] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Inventory Manager</h1>
        </header>
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<ItemList shouldFetch={shouldFetchItems} setShouldFetch={setShouldFetchItems} />} />
          <Route path="/item/:id" element={<ItemDetail setShouldFetch={setShouldFetchItems} />} />
          <Route path="/add" element={<ItemForm setShouldFetch={setShouldFetchItems} />} />
          <Route path="/edit/:id" element={<ItemForm setShouldFetch={setShouldFetchItems} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;