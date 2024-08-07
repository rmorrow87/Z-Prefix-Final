const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    let items;
    if (req.query.user_id) {
      items = await knex('items').where('user_id', req.query.user_id);
    } else {
      items = await knex('items').select('*');
    }
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET a single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await knex('items').where('id', req.params.id).first();
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new item
app.post('/api/items', async (req, res) => {
  try {
    const { user_id, item_name, description, quantity } = req.body;
    const [id] = await knex('items').insert({
      user_id,
      item_name,
      description,
      quantity
    }).returning('id');
    const newItem = await knex('items').where('id', id).first();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE an item
app.put('/api/items/:id', async (req, res) => {
  try {
    await knex('items').where('id', req.params.id).update(req.body);
    const updatedItem = await knex('items').where('id', req.params.id).first();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    await knex('items').where('id', req.params.id).del();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    const [userId] = await knex('users').insert({
      first_name,
      last_name,
      username,
      password
    }).returning('id');

    res.status(201).json({ id: userId, username });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex('users').where({ username, password }).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ id: user.id, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Checking the database
app.get('/api/debug', async (req, res) => {
  try {
    const users = await knex('users').select('*');
    const items = await knex('items').select('*');
    res.json({ users, items });
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});