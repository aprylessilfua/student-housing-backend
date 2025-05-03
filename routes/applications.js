const express = require('express');
const {
  getApplications,
  createApplication,
  updateApplication
} = require('../controllers/applicationsController');

const router = express.Router();

// Fetch all applications
router.get('/', getApplications);

// Create a new application
router.post('/', createApplication);

// Update application status (approve/reject)
router.put('/:id', updateApplication);

module.exports = router;

