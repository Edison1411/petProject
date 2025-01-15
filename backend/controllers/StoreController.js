const pool = require('../db/db');

module.exports = {
  getInventory: async (req, res) => {
    try {
      // Example: return the count of pets by status
      const query = `
        SELECT status, COUNT(*) as count
        FROM pet
        GROUP BY status;
      `;
      const result = await pool.query(query);
      // Return an object like { available: 10, pending: 2, sold: 5 }
      const inventory = {};
      result.rows.forEach(row => {
        inventory[row.status] = parseInt(row.count, 10);
      });
      res.json(inventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { petId, quantity, shipDate, status, complete } = req.body;
      const query = `
        INSERT INTO orders (petId, quantity, shipDate, status, complete)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [petId, quantity, shipDate, status, complete];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const query = `SELECT * FROM orders WHERE id = $1`;
      const result = await pool.query(query, [orderId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const query = `DELETE FROM orders WHERE id = $1 RETURNING *`;
      const result = await pool.query(query, [orderId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
