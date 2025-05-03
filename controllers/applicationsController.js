const db = require('../db/db');

// Get all applications
const getApplications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications');
    res.json(result.rows);
  } catch (err) {
    console.error('getApplications error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  const {
    user_id,
    room_id,
    status,
    applied_at,
    room_preference,
    personal_details,
    notified
  } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO applications
         (user_id, room_id, status, applied_at, room_preference, personal_details, notified)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [user_id, room_id, status, applied_at, room_preference, personal_details, notified]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('createApplication error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing application (e.g. approve/reject)
const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await db.query(
      `UPDATE applications
          SET status = $1
        WHERE id = $2
        RETURNING *`,
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('updateApplication error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication
};
