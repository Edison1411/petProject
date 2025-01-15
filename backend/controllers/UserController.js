const pool = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  createWithList: async (req, res) => {
    return res.status(501).json({ message: 'Not implemented in this demo.' });
  },

  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user by username:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username } = req.params;
      const { firstName, lastName, email, password, phone, userStatus } = req.body;

      const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (checkUser.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updateQuery = `
        UPDATE users
        SET firstName = $1, lastName = $2, email = $3, password = COALESCE($4, password),
            phone = $5, userStatus = COALESCE($6, userStatus)
        WHERE username = $7
        RETURNING *;
      `;
      const values = [
        firstName,
        lastName,
        email,
        hashedPassword || null,
        phone,
        userStatus !== undefined ? userStatus : null,
        username
      ];

      const result = await pool.query(updateQuery, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { username } = req.params;
      const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.query;
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      if (result.rowCount === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = result.rows[0];
      const match = password === user.password 
        ? true // for demo purposes, we're not hashing the password in the database
        : await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  logout: async (req, res) => {
    return res.json({ message: 'Logout successful (client should discard token)' });
  },

  createWithArray: async (req, res) => {
    return res.status(501).json({ message: 'Not implemented in this demo.' });
  },

  createUser: async (req, res) => {
    try {
      const { username, firstName, lastName, email, password, phone, userStatus } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO users (username, firstName, lastName, email, password, phone, userStatus)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [username, firstName, lastName, email, hashedPassword, phone, userStatus || 0];
      const result = await pool.query(insertQuery, values);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
