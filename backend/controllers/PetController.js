const pool = require('../db/db');
const Pet = require('../models/Pet');

module.exports = {
  uploadImage: async (req, res) => {
    // not working on this demo
    return res.status(501).json({ message: 'Not implemented in this demo.' });
  },

  createPet: async (req, res) => {
    try {
      const { category, name, photoUrls, tags, status } = req.body;
      let categoryId = null;

      if (category && category.id) {
        categoryId = category.id;
      }

      const insertQuery = `
        INSERT INTO pet (category_id, name, status, photoUrls)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [categoryId, name, status, photoUrls];
      const result = await pool.query(insertQuery, values);
      const newPet = result.rows[0];

      return res.status(201).json(newPet);
    } catch (error) {
      console.error('Error creating pet:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePet: async (req, res) => {
    try {
      const { id, category, name, status, photoUrls } = req.body;

      // Check if pet exists
      const checkPet = await pool.query('SELECT * FROM pet WHERE id = $1', [id]);
      if (checkPet.rowCount === 0) {
        return res.status(404).json({ message: 'Pet not found' });
      }

      let categoryId = null;
      if (category && category.id) {
        categoryId = category.id;
      }

      const updateQuery = `
        UPDATE pet
        SET category_id = $1, name = $2, status = $3, photoUrls = $4
        WHERE id = $5
        RETURNING *;
      `;
      const values = [categoryId, name, status, photoUrls, id];
      const result = await pool.query(updateQuery, values);

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating pet:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  findByStatus: async (req, res) => {
    try {
      const status = req.query.status;
      const query = `SELECT * FROM pet WHERE status = $1`;
      const result = await pool.query(query, [status]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error finding pets by status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  findByTags: async (req, res) => {
    // not working on this demo
    return res.status(501).json({ message: 'Not implemented in this demo.' });
  },

  findById: async (req, res) => {
    try {
      const { petId } = req.params;
      const result = await pool.query('SELECT * FROM pet WHERE id = $1', [petId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error finding pet by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updatePetForm: async (req, res) => {
    return res.status(501).json({ message: 'Not implemented in this demo.' });
  },

  deletePet: async (req, res) => {
    try {
      const { petId } = req.params;
      const result = await pool.query('DELETE FROM pet WHERE id = $1 RETURNING *', [petId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
      console.error('Error deleting pet:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
