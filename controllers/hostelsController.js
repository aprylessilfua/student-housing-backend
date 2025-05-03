// controllers/hostelsController.js

const pool = require('../db/db');

// Fetch all hostels, now including address
async function getAllHostels(req, res) {
  try {
    const result = await pool.query(
      `SELECT
         id,
         name,
         address,
         description,
         occupancy_limit,
         photo_url
       FROM hostels
       ORDER BY id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('getAllHostels error:', err);
    res.status(500).json({ error: 'Failed to fetch hostels.' });
  }
}

// Fetch single hostel by ID, now including address
async function getHostelById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT
         id,
         name,
         address,
         description,
         occupancy_limit,
         photo_url
       FROM hostels
       WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('getHostelById error:', err);
    res.status(500).json({ error: 'Failed to fetch hostel.' });
  }
}

// Create a new hostel
async function createHostel(req, res) {
  try {
    const { name, address, description, occupancy_limit, photo_url } = req.body;
    const result = await pool.query(
      `INSERT INTO hostels
         (name, address, description, occupancy_limit, photo_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, address, description, occupancy_limit, photo_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createHostel error:', err);
    res.status(500).json({ error: 'Failed to create hostel.' });
  }
}

// Update an existing hostel
async function updateHostel(req, res) {
  try {
    const { id } = req.params;
    const { name, address, description, occupancy_limit, photo_url } = req.body;
    const result = await pool.query(
      `UPDATE hostels
          SET name = $1,
              address = $2,
              description = $3,
              occupancy_limit = $4,
              photo_url = $5
        WHERE id = $6
        RETURNING *`,
      [name, address, description, occupancy_limit, photo_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateHostel error:', err);
    res.status(500).json({ error: 'Failed to update hostel.' });
  }
}

// Delete a hostel
async function deleteHostel(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM hostels WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json({ message: 'Hostel deleted' });
  } catch (err) {
    console.error('deleteHostel error:', err);
    res.status(500).json({ error: 'Failed to delete hostel.' });
  }
}

module.exports = {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel,
  deleteHostel,
};
