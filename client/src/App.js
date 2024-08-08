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
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/add">Add Item</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
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
      <div className="container">
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